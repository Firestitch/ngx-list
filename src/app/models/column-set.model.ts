import { Column } from './column.model';


/**
 * One complete set of columns.
 *
 * A list always has a base set (`maxWidth === null`, the desktop markup) and zero or more
 * breakpoint sets declared inside `<fs-list-breakpoint [maxWidth]="n">`. Exactly one set is
 * active at a time; the active set's `rendered` array is what `<thead>`/`<tbody>`/`<tfoot>`
 * iterate.
 *
 * Every set owns its own `Column` instances, so per-set colspan flags, templates and titles
 * can never leak across sets.
 */
export class ColumnSet {

  public readonly columns: Column[] = [];

  /** `columns` filtered by visibility -- the array the three bands iterate. */
  public rendered: Column[] = [];

  public hasHeader = false;
  public hasFooter = false;

  /**
   * Structural cell overrides. `null` means "inherit whatever the list is configured to do";
   * `false` suppresses that structural cell while this set is active. Only ever set from
   * `<fs-list-breakpoint>` inputs -- the base set always inherits.
   */
  public selection: boolean | null = null;
  public rowActions: boolean | null = null;
  public reorder: boolean | null = null;

  /**
   * @param maxWidth Upper bound in px this set applies at (inclusive). `null` for the base set.
   */
  constructor(
    public readonly maxWidth: number | null,
  ) {}

  public get isBase(): boolean {
    return this.maxWidth === null;
  }

  /** The media query this set activates at, or null for the base set. */
  public get media(): string | null {
    return this.maxWidth === null
      ? null
      : `(max-width: ${this.maxWidth}px)`;
  }

  /**
   * Resolve everything that depends only on the declared columns, not on visibility.
   * Called once, when the set is built.
   */
  public resolve(): void {
    resolveColspans(this.columns);

    this.hasHeader = this.columns
      .some((column) => !!column.headerTemplate || !!column.title);
    this.hasFooter = this.columns
      .some((column) => !!column.footerTemplate);

    this.update();
  }

  /** Refresh the rendered array. Called whenever column visibility changes. */
  public update(): void {
    this.rendered = this.columns.filter((column) => column.visible);
  }

}

const COLSPAN_SLOTS: { config: string; flag: string }[] = [
  { config: 'headerConfigs', flag: 'headerColspanned' },
  { config: 'groupHeaderConfigs', flag: 'groupHeaderColspanned' },
  { config: 'groupFooterConfigs', flag: 'groupFooterColspanned' },
  { config: 'cellConfigs', flag: 'cellColspanned' },
  { config: 'footerConfigs', flag: 'footerColspanned' },
];

/**
 * Mark which columns are spanned over by an earlier column's `colspan`.
 *
 * Resolved over the full declared column list (not the visible subset), which is the
 * behaviour the single-set implementation has always had. Every flag is reset first so
 * the pass is idempotent and a set can be re-resolved safely.
 */
export function resolveColspans(columns: Column[]): void {
  COLSPAN_SLOTS.forEach(({ config, flag }) => {
    columns.forEach((column) => {
      column[flag] = false;
    });

    columns.forEach((column, index) => {
      const colspan = column[config]?.colspan;

      if (colspan === undefined || colspan === null) {
        return;
      }

      const spanTo = Math.min(index + Number(colspan), columns.length);

      if (!Number.isFinite(spanTo)) {
        return;
      }

      for (let i = index + 1; i < spanTo; i++) {
        columns[i][flag] = true;
      }
    });
  });
}
