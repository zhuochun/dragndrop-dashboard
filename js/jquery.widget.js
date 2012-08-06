/* ========================================
 * Cost Modal Dashboard - jQuery Widget Plugin
 *
 * Author: Wang Zhuochun
 * Last Edit: 03/Aug/2012 02:02 PM
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
    , _pluginName = "widget"
    // default options for plugin
    , defaults = {
        // the widget is loaded
          initialized : true
        , controls : {
            refresh : true
          , setting : true
          , fold : true
          , remove : true
        }
        // TODO: add form action
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.elem = element;
        this.options = $.extend({}, defaults, options) ;

        this.init();
    }

    // Plugin methods
    Plugin.fn = Plugin.prototype;

    Plugin.fn.init = function() {
        var $this;
        // $elem DOM element
        $this = this.$elem = $(this.elem);

        // content DOM element
        this.$content = $this.find(".widget-content");
        // panels DOM element
        this.$panels = $this.find(".widget-panel");
        // controls DOM element
        this.$control = $this.find(".widget-control");

        // bind events
        this.bindEvents();
    };

    Plugin.fn.bindEvents = function() {
        // bind setting event
        if (this.options.controls.setting) {
            this.currentPanel = this.options.initialized ? 0 : 1;
            // bind Event
            this.$control.find(".widget-setting").on("click", $.proxy(this.settingEvent, this));
        }

        // bind refresh event
        if (this.options.controls.refresh) {
            this.$control.find(".widget-refresh").on("click", $.proxy(this.refreshEvent, this));
        }

        // bind fold event
        if (this.options.controls.fold) {
            this.$control.find(".widget-fold").on("click", $.proxy(this.foldEvent, this));
        }

        // bind remove event
        if (this.options.controls.remove) {
            this.$control.find(".widget-remove").on("click", $.proxy(this.hideEvent, this));
        }
    };

    Plugin.fn.settingEvent = function() {
        var
          active = ".widget-panel-active"
        , panelDefault = this.$panels.get(this.currentPanel)
        , panelSetting = this.$panels.get(1 - this.currentPanel);

        if (this.$content.is(":hidden")) {
            if (this.currentPanel !== 1) {
                $(panelDefault).removeClass(active).hide();
                $(panelSetting).addClass(active).show();
                // update the new current
                this.currentPanel = 1;
            }
            // slide down
            this.foldEvent();
        } else {
            // hide current
            $(panelDefault).removeClass(active).slideToggle();
            // show the other
            $(panelSetting).addClass(active).slideToggle();
            // update the new current
            this.currentPanel = 1 - this.currentPanel;
        }
    };

    Plugin.fn.refreshEvent = function() {
        window.console.log("Refreshing");
    };

    Plugin.fn.foldEvent = function() {
        var
          $i = this.$control.find(".widget-fold").find("i")
        , foldIconClass = ["icon-resize-small", "icon-resize-full"]
        , foldIconTitle = ["Minimize", "Maximize"];

        if ($i.hasClass(foldIconClass[0])) {
            this.$content.slideUp(function() {
                $i.removeClass(foldIconClass[0]).addClass(foldIconClass[1]).attr("data-original-title", foldIconTitle[1]);
            });
        } else {
            this.$content.slideDown(function() {
                $i.removeClass(foldIconClass[1]).addClass(foldIconClass[0]).attr("data-original-title", foldIconTitle[0]);
            });
        }
    };

    Plugin.fn.hideEvent = function() {
        var that = this;

        this.$elem.slideUp(function() {
            that.$elem.remove();
        });
    };

    Plugin.fn.trigger = function(action) {
        var eventName = action + "Event";

        if (this.options.controls[action]) {
            this[eventName]();
        }
    };

    /* PLUGIN DEFINITION
     * ======================================== */
    $.fn.Widget = function(options) {
        return this.each(function () {
            if (!$.data(this, _project + _pluginName)) {
                $.data(this, _project + _pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery));
