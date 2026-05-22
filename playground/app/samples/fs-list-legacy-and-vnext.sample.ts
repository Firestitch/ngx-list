/**
 * Illustrative only — not imported by the app. Nothing below is implemented as a second API.
 *
 * =============================================================================
 * You are already ~Material / CDK table-shaped
 * =============================================================================
 *
 * Same mental model: a **table host** + **column containers** + **header / cell / footer**
 * templates per column. Not a different UX paradigm.
 *
 * | CDK / Material (example)              | ngx-list (today)                    |
 * |---------------------------------------|-------------------------------------|
 * | `<table cdk-table [dataSource]=...>` | `<fs-list [config]=...>`           |
 * | `<ng-container cdkColumnDef="id">`   | `<fs-list-column name="id">`      |
 * | `<th *cdkHeaderCellDef>`             | `<ng-template fs-list-header>`      |
 * | `<td *cdkCellDef="let row">`         | `<ng-template fs-list-cell let-row>`|
 * | (footer variants)                    | `<ng-template fs-list-footer>`      |
 *
 * The **gap** vs Material for IDE **`let-row`** typing is not “your markup is wrong.”
 * It’s **where** the template is type-checked: CDK’s row context is wired **inside**
 * `CdkTable<T>` when it instantiates cells; `fs-list` still **projects** those templates
 * from the parent, so Angular doesn’t automatically inherit `T` from `[config]` without
 * a per-cell hint (`[configTyping]`, `[rowType]`, or a typed cell directive subclass).
 *
 * A **realistic** evolution for a Material-like list is usually **small**:
 * same HTML as now, plus **internal** / **typing** improvements (e.g. generic host,
 * optional `DataSource<TRow>`-style input **alongside** `config`, tighter `createEmbeddedView`
 * context typing) — **not** throwing away `fs-list-column` + `ng-template` markup.
 *
 * =============================================================================
 * LEGACY / TODAY (unchanged; stays supported)
 * =============================================================================
 *
 * ```html
 * <fs-list [config]="config">
 *   <fs-list-column name="id">
 *     <ng-template fs-list-header>ID</ng-template>
 *     <ng-template fs-list-cell let-row="row">{{ row.id }}</ng-template>
 *   </fs-list-column>
 * </fs-list>
 * ```
 *
 * ```ts
 * export interface OrderRow { id: string; name: string; }
 * config: FsListConfig<OrderRow> = {
 *   fetch: (query) => this.api.orders(query).pipe(map(r => ({ data: r.items, paging: r.paging }))),
 * };
 * ```
 *
 * =============================================================================
 * OPTIONAL NOTE: data-driven columns (NOT required to be “like Material”)
 * =============================================================================
 *
 * Some products define columns as a **TS array** (`columnDefs`) for dynamic grids.
 * That’s a **different** authoring style (more like building a config table in code).
 * It is **one** way to push more typing into TS; it is **not** the natural next step
 * if your goal is to stay parallel to **CDK’s declarative column + template** pattern.
 * The earlier long “vNext” sample in git history leaned on that **optional** style;
 * ignore it if you want to stay 99% Material-shaped.
 *
 * =============================================================================
 * COEXISTENCE
 * =============================================================================
 *
 * Any future typing or data-source ergonomics should **extend** `fs-list` / `FsListConfig`
 * without replacing the Material-like column template API until a deliberate major version.
 */

export const FS_LIST_FORMAT_SAMPLES_README = true;
