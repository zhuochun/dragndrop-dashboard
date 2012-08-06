/* ========================================
 * Cost Modal Dashboard - jQuery DragDrop Plugin
 *
 * Author: Wang Zhuochun
 * Last Edit: 03/Aug/2012 04:01 PM
 * ========================================
 * <License>
 * ======================================== */

;(function($) {

    "use strict";
    /*jshint browser:true, jquery:true, laxcomma:true, maxerr:50*/

    /* PLUGIN CLASS DEFINITION
     * ======================================== */
    var
      _project = "cmd_"
    , _pluginName = "dragdrop";

    // Plugin constructor
    function Plugin(element) {
        this.elem = element;
        // initial drag and drop
        this.init();
    }

    // Plugin methods
    Plugin.fn = Plugin.prototype;

    Plugin.fn.init = function() {
        // $elem DOM element
        this.$elem = $(this.elem);
        // call jQuery UI sortable
        this.$elem.sortable({
          // allow drag between columns
            connectWith: ".column"
          , containment: "#main"
          // cursor type
          , cursor: "move"
          // go back to original position
          , revert: true
          // drag handler
          , handle: ".widget-title h3"
          // placeholder class
          , placeholder: "widget-placeholder"
          // keep placeholder size the same as moving widget
          , forcePlaceholderSize: true
          , opacity: 0.4
          // the way the reordering behaves during drag
          // Possible values: 'intersect', 'pointer'.
          , tolerance: "pointer"
          // This event is triggered when the user stopped sorting
          // and the DOM position has changed.
          , update: function() {
              // TODO position udpate to server Things
          }
        });
    };

    /* PLUGIN DEFINITION
     * ======================================== */
    $.fn.DragDrop = function(options) {
        return this.each(function () {
            if (!$.data(this, _project + _pluginName)) {
                $.data(this, _project + _pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery));
