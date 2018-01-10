import {    Compiler, Injector, NgModuleRef, Component, NgModule, ElementRef,
            ViewContainerRef, ViewChild, ViewEncapsulation, AfterViewInit, OnInit,
            Input, ViewChildren, ContentChildren, QueryList, ApplicationRef } from '@angular/core';
import { FsCellComponent } from './cell.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsList } from './fslist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'fs-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FsListComponent implements AfterViewInit {
    components = [];
    @Input() public list: FsList;
    @ViewChild('vc', { read: ViewContainerRef }) vc;
    @ViewChildren(FsCellComponent, { read: ViewContainerRef }) items: QueryList<ViewContainerRef>;

    constructor(private compiler: Compiler, private _injector: Injector,
                private _m: NgModuleRef<any>, private app: ApplicationRef) {}

    ngAfterViewInit() {

        if (this.list.filters && this.list.filters.length) {
            setTimeout(() => {
                this.list.filterService.fsConfig = {
                    persist: this.list.persist,
                    items: this.list.filters,
                    inline: this.list.inlineFilters,
                    init: (instance) => {
                        this.list.load(instance.gets({ flatten: true }));
                    },
                    change: (query, instance) => {
                        this.list.load(instance.gets({ flatten: true }));
                    }
                };
            });
        }else {
            this.list.load({});
        }

        this.items.changes
            .subscribe((cellRef) => {
                this.renderColumns();
            });
    }

    renderColumns() {

        this.components = [];
        this.compiler.clearCache();

        this.list.data$.value.forEach(row => {
            this.list.columns.forEach(column => {

                let component = Component({
                    template: column.template,
                    encapsulation: ViewEncapsulation.Emulated,
                    styles: []
                })(class implements OnInit {
                    public row = row;
                    // public column = column;
                    ngOnInit() {
                        Object.assign(this, column.data || {});
                    }
                });

                this.components.push(component);
            });
        });

        const tmpModule = NgModule({
            declarations: this.components,
            imports: this.list.imports
        })(class {});

        this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
        .then((factories) => {
            this.items.forEach((item, index) => {
                let cmpRef = factories.componentFactories[index].create(this._injector, [], null, this._m);
                cmpRef.instance.name = 'dynamic' + index;
                item.insert(cmpRef.hostView);
            });
        });
    }

    topActionsClick(action, $event) {
        if (action.click) {
            action.click(this.list.filtersQuery, $event);
        }
    }
}
