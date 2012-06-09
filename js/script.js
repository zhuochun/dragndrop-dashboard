/*
 * Author: Wang Zhuochun
 * Last Edit: 09/Jun/2012 06:21 PM
 */

(function($) {
    // enable tooltips
    $("header li.visible-desktop").tooltip({placement:'bottom', selector:"a[rel=tooltip]"});
    $("#tab-lists, #pane-contents").tooltip({selector:"a[rel=tooltip]"})

})(jQuery);
