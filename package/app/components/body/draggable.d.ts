import { ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
export declare class Draggable {
    private el;
    private cdRef;
    private zone;
    private _rows;
    dragElement: {
        targetEl: any;
        draggableEl: any;
        targetHeight: any;
        activeIndex: any;
        moveHandler: any;
        stopHandler: any;
    };
    elements: any;
    constructor(el: ElementRef, cdRef: ChangeDetectorRef, zone: NgZone, _rows: any[]);
    rows: any;
    /**
     * Prepare draggable elements and add events
     * @param event
     */
    dragStart(event: any): void;
    /**
     * Move draggable elements and swap items
     * @param event
     */
    dragTo(event: any): void;
    /**
     * Remove events and classes after drag finish
     */
    dragEnd(): void;
    /**
     * looking row elements and save their dims
     */
    private prepareElements();
    /**
     * Store child rows
     */
    private lookupChildElements();
    /**
     * Calc child rows sizes/offsets
     */
    private calcElementsDimensions();
    /**
     * Init draggable element
     * @param event
     */
    private initDraggableElement(event);
    /**
     * Looking by stored row elemens for overlapped row
     * @param event
     * @returns {any}
     */
    private lookupElementUnder(event);
    /**
     * Swap rows
     * @param index
     */
    private swapWithIndex(index);
    /**
     * Update cell width for draggable elem
     * @param event
     */
    private updateDraggableDims(event);
    /**
     * Fix background when mobile
     * @param e
     */
    private touchFix(e);
}
