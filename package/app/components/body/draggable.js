"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Draggable = (function () {
    function Draggable(el, cdRef, zone, _rows) {
        this.el = el;
        this.cdRef = cdRef;
        this.zone = zone;
        this._rows = _rows;
        this.dragElement = {
            targetEl: null,
            draggableEl: null,
            targetHeight: null,
            activeIndex: null,
            moveHandler: this.dragTo.bind(this),
            stopHandler: this.dragEnd.bind(this)
        };
    }
    Object.defineProperty(Draggable.prototype, "rows", {
        set: function (value) {
            this._rows = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Prepare draggable elements and add events
     * @param event
     */
    Draggable.prototype.dragStart = function (event) {
        var _this = this;
        window.document.body.classList.add('reorder-in-progress');
        this.dragElement.targetEl = event.target;
        this.prepareElements();
        this.initDraggableElement(event);
        this.dragElement.targetEl.classList.add('draggable-elem');
        this.zone.runOutsideAngular(function () {
            window.document.addEventListener('mousemove', _this.dragElement.moveHandler);
            window.document.addEventListener('touchmove', _this.dragElement.moveHandler, { passive: false });
            window.document.addEventListener('mouseup', _this.dragElement.stopHandler);
            window.document.addEventListener('touchend', _this.dragElement.stopHandler);
            window.document.addEventListener('touchcancel', _this.dragElement.stopHandler);
        });
    };
    /**
     * Move draggable elements and swap items
     * @param event
     */
    Draggable.prototype.dragTo = function (event) {
        this.touchFix(event);
        var elemIndex = this.lookupElementUnder(event);
        if (elemIndex !== null) {
            this.swapWithIndex(elemIndex);
        }
        var topOffset = (event.y || event.clientY) - (this.dragElement.targetHeight / 2);
        this.dragElement.draggableEl.style.top = topOffset + 'px';
    };
    /**
     * Remove events and classes after drag finish
     */
    Draggable.prototype.dragEnd = function () {
        this.dragElement.targetEl.classList.remove('draggable-elem');
        window.document.body.classList.remove('reorder-in-progress');
        this.dragElement.draggableEl.remove();
        window.document.removeEventListener('mousemove', this.dragElement.moveHandler);
        window.document.removeEventListener('touchmove', this.dragElement.moveHandler);
        window.document.removeEventListener('mouseup', this.dragElement.stopHandler);
        window.document.removeEventListener('touchend', this.dragElement.stopHandler);
        window.document.removeEventListener('touchcancel', this.dragElement.stopHandler);
    };
    /**
     * looking row elements and save their dims
     */
    Draggable.prototype.prepareElements = function () {
        this.lookupChildElements();
        this.calcElementsDimensions();
    };
    /**
     * Store child rows
     */
    Draggable.prototype.lookupChildElements = function () {
        var _this = this;
        this.elements = Array.from(this.el.nativeElement.querySelectorAll('tr')).reduce(function (acc, rowElement, index) {
            var element = { target: rowElement };
            if (rowElement === _this.dragElement.targetEl) {
                _this.dragElement.activeIndex = index;
                element.active = true;
            }
            acc.push(element);
            return acc;
        }, []);
    };
    /**
     * Calc child rows sizes/offsets
     */
    Draggable.prototype.calcElementsDimensions = function () {
        this.elements.forEach(function (el, index) {
            var dims = el.target.getBoundingClientRect();
            el.top = dims.top;
            el.height = dims.height;
            el.center = dims.top + (dims.height / 2);
            el.index = index;
        });
    };
    /**
     * Init draggable element
     * @param event
     */
    Draggable.prototype.initDraggableElement = function (event) {
        var el = event.target.cloneNode(true);
        var data = event.target.getBoundingClientRect();
        el.style.width = data.width + 'px';
        el.style.left = data.left + 'px';
        el.style.top = data.top + 'px';
        el.classList.add('draggable');
        this.el.nativeElement.append(el);
        this.dragElement.draggableEl = el;
        this.dragElement.targetHeight = data.height;
        this.updateDraggableDims(event);
    };
    /**
     * Looking by stored row elemens for overlapped row
     * @param event
     * @returns {any}
     */
    Draggable.prototype.lookupElementUnder = function (event) {
        var top = event.y || event.clientY - (this.dragElement.targetHeight / 2);
        var bottom = event.y || event.clientY + this.dragElement.targetHeight - (this.dragElement.targetHeight / 2);
        var elemIndex = null;
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            if (!el.active) {
                // 30 - it is offset from center
                if (top < el.center + 30 && el.index < this.dragElement.activeIndex
                    || bottom > el.center - 30 && el.index > this.dragElement.activeIndex) {
                    elemIndex = i;
                }
            }
        }
        return elemIndex;
    };
    /**
     * Swap rows
     * @param index
     */
    Draggable.prototype.swapWithIndex = function (index) {
        var _this = this;
        var activeIndex = this.dragElement.activeIndex;
        var activeRow = this._rows[activeIndex];
        this._rows[activeIndex] = this._rows[index];
        this._rows[index] = activeRow;
        activeRow = this.elements[activeIndex].target;
        this.elements[activeIndex].active = false;
        this.elements[activeIndex].target = this.elements[index].target;
        this.elements[index].target = activeRow;
        this.elements[index].active = true;
        this.dragElement.activeIndex = index;
        this.zone.run(function () {
            _this.cdRef.markForCheck();
        });
    };
    /**
     * Update cell width for draggable elem
     * @param event
     */
    Draggable.prototype.updateDraggableDims = function (event) {
        var draggableCells = Array.from(this.dragElement.draggableEl.querySelectorAll('td'));
        Array.from(event.target.querySelectorAll('td')).forEach(function (elem, index) {
            var dims = elem.getBoundingClientRect();
            draggableCells[index].style.width = dims.width + 'px';
        });
    };
    /**
     * Fix background when mobile
     * @param e
     */
    Draggable.prototype.touchFix = function (e) {
        if (!('clientX' in e) && !('clientY' in e)) {
            var touches = e.touches || e.originalEvent.touches;
            if (touches && touches.length) {
                e.clientX = touches[0].clientX;
                e.clientY = touches[0].clientY;
            }
            e.preventDefault();
        }
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.js.map