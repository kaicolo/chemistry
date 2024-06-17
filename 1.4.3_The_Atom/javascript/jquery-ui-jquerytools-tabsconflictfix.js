// Both jQuery UI and jQuery Tools define a tabs function on jQuery objects.
// We use both libraries (jQuery Tools for its non-restricting tabs function and overlay; jQuery UI for autocomplete.)
// To avoid a conflict over tabs, rename the jQuery UI tabs.  Call this code after loading jQuery UI but before
//  calling jQuery Tools.
var oldTabs = $.fn.tabs;
delete $.fn.tabs;
$.fn.jQueryUiTabs = oldTabs;// JavaScript Document