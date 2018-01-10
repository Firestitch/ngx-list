import { FsCellComponent } from './cell.component';
import { CommonModule } from '@angular/common';
import { FsListComponent } from './list.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsFilterModule } from '@firestitch/filter';
import { FsList } from './fslist';
export * from './fslist';
export * from './list.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        FsFilterModule,
        FlexLayoutModule
    ],
    declarations: [
        FsListComponent,
        FsCellComponent
    ],
    providers: [
    ],
    exports: [
        FsListComponent
    ]
})
export class FsListModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FsListModule,
            providers: [
                FsListComponent
            ]
        };
    }
}
