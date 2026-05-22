# @firestitch/list

### Installation

`npm install @firestitch/list --save`

You can find docs [here](http://list.components.firestitch.com/)

### Row typing (`FsListConfig<TRow>` + `FsListComponent<TRow>`)

Use **`FsListConfig<YourRow>`** and **`FsListComponent<YourRow>`** (e.g. on **`@ViewChild`**) so **`fetch`**, **`afterFetch`**, **`rowClass`**, and **`cellRowType`** share one row type—similar to CDK **`DataSource<T>`** + **`cdk-table`** (defaults stay **`any`** for legacy code).

**`fs-list`** applies merged **`[config]`** to each **`fs-list-cell`** at runtime when you do not set **`[rowType]`** / **`cellRowType`**, so column templates can stay plain **`fs-list-cell`** like CDK’s **`*cdkCellDef="let element"`** without repeating a typing attribute.

**Strict template / IDE narrowing** on **`let-row`** still needs a binding Angular can see: optional **`[configTyping]="config"`** per cell, **`[rowType]`**, **`FsListCellRowTypeScopeDirective`**, or **`FsTypedListCellDirective<YourRow>`**—projected content is not typed from **`fs-list`** alone.
