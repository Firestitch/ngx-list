import { ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';

export class Draggable {

  public dragElement = {
    targetEl: null,
    draggableEl: null,
    targetHeight: null,
    activeIndex: null,
    moveHandler: this.dragTo.bind(this),
    stopHandler: this.dragEnd.bind(this)
  };

  public elements;

  constructor(private el: ElementRef,
              private cdRef: ChangeDetectorRef,
              private zone: NgZone,
              private _rows: any[]) {

  }

  set rows(value) {
    this._rows = value;
  }

  public dragStart(event) {
    this.dragElement.targetEl = event.target;

    this.prepareElements();

    this.initDraggableElement(event);

    this.dragElement.targetEl.classList.add('draggable-elem');

    this.zone.runOutsideAngular(() => {
      window.document.addEventListener('mousemove', this.dragElement.moveHandler);
      window.document.addEventListener('mouseup', this.dragElement.stopHandler);
    });

  }


  public dragTo(event) {
    const elemIndex = this.lookupElementUnder(event);


    if (elemIndex !== null) {
      this.swapWithIndex(elemIndex)
    }

    this.dragElement.draggableEl.style.top = event.y - (this.dragElement.targetHeight / 2) + 'px';
  }

  public dragEnd() {
    this.dragElement.targetEl.classList.remove('draggable-elem');
    this.dragElement.draggableEl.remove();
    window.document.removeEventListener('mousemove', this.dragElement.moveHandler);
    window.document.removeEventListener('mouseup', this.dragElement.stopHandler);
  }

  private prepareElements() {
    this.lookupChildElements();
    this.calcElementsDimensions();
  }

  private lookupChildElements() {
    this.elements = Array.from(
      this.el.nativeElement.querySelectorAll('tr')
    ).reduce((acc: any[], rowElement, index) => {
      const element: any = { target: rowElement };

      if (rowElement === this.dragElement.targetEl) {
        this.dragElement.activeIndex = index;
        element.active = true;
      }

      acc.push(element);

      return acc;
    }, []);
  }

  private calcElementsDimensions() {
    this.elements.forEach((el: any, index) => {
      const dims = el.target.getBoundingClientRect();
      el.top = dims.top;
      el.height = dims.height;
      el.center = dims.top + (dims.height / 2);
      el.index = index;
    });
  }

  private initDraggableElement(event) {
    const el = event.target.cloneNode(true);
    const data = event.target.getBoundingClientRect();

    el.style.width = data.width + 'px';
    el.style.left = data.left + 'px';
    el.style.top = data.top + 'px';

    el.classList.add('draggable');

    this.el.nativeElement.append(el);

    this.dragElement.draggableEl = el;
    this.dragElement.targetHeight = data.height;
  }

  private lookupElementUnder(event) {
    const top = event.y - (this.dragElement.targetHeight / 2);
    const bottom = event.y + this.dragElement.targetHeight - (this.dragElement.targetHeight / 2);

    let elemIndex = null;

    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];

      if (!el.active) {
        if (top < el.center && el.index < this.dragElement.activeIndex
          || bottom > el.center && el.index > this.dragElement.activeIndex) {
          elemIndex = i;
        }
      }
    }

    return elemIndex;
  }

  private swapWithIndex(index) {
    const activeIndex = this.dragElement.activeIndex;

    let activeRow = this._rows[activeIndex];
    this._rows[activeIndex] = this._rows[index];
    this._rows[index] = activeRow;

    activeRow = this.elements[activeIndex].target;
    this.elements[activeIndex].active = false;

    this.elements[activeIndex].target = this.elements[index].target;
    this.elements[index].target = activeRow;
    this.elements[index].active = true;
    this.dragElement.activeIndex = index;

    this.zone.run(() => {
      this.cdRef.markForCheck();
    })
  }
}
