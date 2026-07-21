import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FsListBreakpointsConfig } from '../interfaces';


const DEFAULT_HYSTERESIS = 24;

/**
 * Decides which breakpoint column set is active for one list.
 *
 * Measures the list's own container by default -- a list rendered inside a dialog, drawer
 * or narrow flex column has a viewport width that lies about how much room it actually has.
 * `breakpoints: { container: false }` switches to viewport media queries via the CDK, which
 * costs no JS at all between thresholds.
 *
 * Emits the `maxWidth` of the narrowest matching set, or `null` when the base set applies.
 */
@Injectable()
export class BreakpointController implements OnDestroy {

  private _zone = inject(NgZone);
  private _breakpointObserver = inject(BreakpointObserver);

  private _active$ = new BehaviorSubject<number | null>(null);
  private _breakpoints: number[] = [];
  private _container = true;
  private _hysteresis = DEFAULT_HYSTERESIS;

  private _resizeObserver: ResizeObserver | null = null;
  private _element: HTMLElement | null = null;
  private _lastWidth: number | null = null;

  /** Refcount of in-flight drags. While > 0 swaps are held, not dropped. */
  private _suspended = 0;
  private _pending: number | null = null;
  private _hasPending = false;

  private _observing$ = new Subject<void>();
  private _destroy$ = new Subject<void>();

  /** The `maxWidth` of the active set, or null for the base set. */
  public get active(): number | null {
    return this._active$.getValue();
  }

  public get active$(): Observable<number | null> {
    return this._active$
      .pipe(distinctUntilChanged());
  }

  public get container(): boolean {
    return this._container;
  }

  public initConfig(config: FsListBreakpointsConfig = {}): void {
    this._container = config?.container ?? true;
    this._hysteresis = config?.hysteresis ?? DEFAULT_HYSTERESIS;
  }

  /**
   * Declare the breakpoints to watch, as `maxWidth` values in px.
   * Re-registering tears down the previous observation.
   */
  public setBreakpoints(breakpoints: number[]): void {
    this._breakpoints = [...breakpoints]
      .filter((value) => Number.isFinite(value))
      .sort((a, b) => a - b);

    this._restart();
  }

  /** Supply the element to measure in container mode. Ignored in viewport mode. */
  public observe(element: HTMLElement): void {
    this._element = element;

    this._restart();
  }

  /**
   * Hold breakpoint swaps. Refcounted, and the latest value is applied on the final
   * `resume()` -- a crossing during a drag is deferred, never lost.
   *
   * Mandatory during a drag: the draggable directive snapshots every row's top/height once
   * at drag start and hit-tests against that frozen cache, so a mid-drag reflow silently
   * produces the wrong drop target.
   */
  public suspend(): void {
    this._suspended++;
  }

  public resume(): void {
    if (this._suspended === 0) {
      return;
    }

    this._suspended--;

    if (this._suspended === 0 && this._hasPending) {
      this._hasPending = false;
      this._emit(this._pending);
    }
  }

  public ngOnDestroy(): void {
    this._teardown();

    this._suspended = 0;
    this._observing$.next();
    this._observing$.complete();
    this._destroy$.next();
    this._destroy$.complete();
    this._active$.complete();
  }

  private _restart(): void {
    this._teardown();

    if (!this._breakpoints.length) {
      this._emit(null);

      return;
    }

    if (this._container) {
      this._observeContainer();
    } else {
      this._observeViewport();
    }
  }

  private _observeViewport(): void {
    const queries = this._breakpoints
      .map((maxWidth) => `(max-width: ${maxWidth}px)`);

    this._breakpointObserver
      .observe(queries)
      .pipe(
        takeUntil(this._observing$),
        takeUntil(this._destroy$),
      )
      .subscribe((state) => {
        // _breakpoints is ascending, so the first match is the narrowest one.
        const match = this._breakpoints
          .find((maxWidth) => state.breakpoints[`(max-width: ${maxWidth}px)`]);

        this._emit(match ?? null);
      });
  }

  private _observeContainer(): void {
    if (!this._element || typeof ResizeObserver === 'undefined') {
      this._emit(null);

      return;
    }

    // Seed synchronously so the first render already has the right set and we never
    // paint the desktop columns before flipping to compact.
    this._applyWidth(this._element.getBoundingClientRect().width, true);

    // Outside Angular: ResizeObserver fires on every frame of a drag-resize and we only
    // want a CD pass on the frames that actually cross a threshold.
    this._zone.runOutsideAngular(() => {
      this._resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width;

        if (width === undefined) {
          return;
        }

        this._applyWidth(width, false);
      });

      this._resizeObserver.observe(this._element);
    });
  }

  /**
   * Map a measured width onto a set, with a hysteresis band so a container parked exactly
   * on a threshold cannot oscillate between two sets on sub-pixel reflows.
   */
  private _applyWidth(width: number, initial: boolean): void {
    // A detached or display:none container measures 0. Treat it as "no information" and
    // keep whatever set is active, otherwise a hidden tab would flip to the narrowest set.
    if (!width) {
      return;
    }

    if (!initial && this._lastWidth !== null) {
      const crossed = this._breakpoints
        .some((maxWidth) => (this._lastWidth <= maxWidth) !== (width <= maxWidth));

      if (!crossed) {
        this._lastWidth = width;

        return;
      }

      const nearThreshold = this._breakpoints
        .some((maxWidth) => Math.abs(width - maxWidth) < this._hysteresis);

      if (nearThreshold && Math.abs(width - this._lastWidth) < this._hysteresis) {
        return;
      }
    }

    this._lastWidth = width;

    const match = this._breakpoints
      .find((maxWidth) => width <= maxWidth);

    const next = match ?? null;

    if (next === this.active) {
      return;
    }

    if (initial) {
      this._emit(next);
    } else {
      // Back into the zone only when the set actually changes.
      this._zone.run(() => this._emit(next));
    }
  }

  private _emit(value: number | null): void {
    if (this._suspended > 0) {
      this._pending = value;
      this._hasPending = true;

      return;
    }

    this._active$.next(value);
  }

  private _teardown(): void {
    this._observing$.next();

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    this._lastWidth = null;
  }

}
