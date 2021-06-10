# tracking-times

//----------------------------
// version 1.7.0
//----------------------------

tec dept

- version 1.7.0

//----------------------------
// version 1.6.3
//----------------------------

tec dept:

- create dynamic filter componenz

//----------------------------
// version 1.6.2
//----------------------------

features:

- change filter-label 'Now' to 'Today'
- show 'unfilter' button only if entries are filtered

bugfix:

- fix incorect initialization of start date filter

tec debt:

- add 'design' attribute to all buttons

//----------------------------
// version 1.6.1
//----------------------------

bugfix:

- filters do not reset filter dates set by now-button

//----------------------------
// version 1.6
//----------------------------

features:

- add start-date filters

tec debt:

- same entry layouts for all widths
- remove mid-size-layout

//----------------------------
// version 1.5
//----------------------------

features:

- new button: Select All
- remove 'clear' button
- add sort

tec debt:

- make app-entry:select modifyable
- create a css class to select all buttons for multiple record at once
- remove test for file download. It's a build in Browser function we can't test

bigfix:

- fix Label of "Deselect All"

//----------------------------
// version 1.4
//----------------------------

features:

- new button: Deselect All

//----------------------------
// version 1.3
//----------------------------

features:

- new button: delete selected
- selecting entry disables delete-button

bugfixes:

- display sidemenu in front

//----------------------------
// version 1.2
//----------------------------

features:

- selectable entries
- summary for selected entries

tec dept:

- use itemId for identifying entries instead of sortnumber

//----------------------------
// version 1.1.1.1
//----------------------------

hotfixes:

- add breaktime to export
- improve duration output for export
- improve formating of export

//----------------------------
// version 1.1.1
//----------------------------

bugfixes:

- interpret "" as 0 for difference calculation

tec dept:

- broken jest test for entry cmp are fixed
- removed unnecessary code

//----------------------------
// version 1.1.0
//----------------------------

features:

- add sidemenu for slim screen
- add break time

bugfixes:

- shows linebreaks in comment output

tec dept:

- sort label in entry cmp
- move entry cmp to app folder

//----------------------------
// version 1.0.2
//----------------------------

tec dept:

- On clearing only remove stored entries instead of whole storge
- remove duplicate buttons which were rendered conditionally
- remove repeated unnecessary font definitions
- add version history file

//----------------------------
// version 1.0.1
//----------------------------

bugfixes:

- comment input is now only scrollable in x-axis
- when app is on max-width comment-output now extends over whole entry-height

tec dept:

- Export method is renamed from '...Csv' to '...Txt'
- remove obsolete clear-confirm
- button-cmp now has a fallback
- button-cmp name does not look like being connected to modal
- edit-modal uses the new modal cmp now

//----------------------------
// version 1.0
//----------------------------

features:

- more button styles
- confirm before deleting entry
- assign a maximum width for app
- disable clear when list is empty

bugfixes:

- entry does not extend beyond frame anymore
- spacing between entries is now consistent with other spacings

tec dept:

- unified modal cmp
