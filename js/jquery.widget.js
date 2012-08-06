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

        // this widget's id
        this.id = $this.attr("id");
        // content DOM element
        this.$content = $this.find(".widget-content");
        // panels DOM element
        this.$panels = $this.find(".widget-panel");
        // controls DOM element
        this.$control = $this.find(".widget-control");

        // bind title button events
        this.bindTitleEvents();
        // bind setting events
        if (this.options.controls.setting) {
            this.bindPanelEvents();
        }
    };

    Plugin.fn.bindPanelEvents = function() {
        this.BgColorChangeEvent();
        this.formSubmitEvent();
    };

    Plugin.fn.BgColorChangeEvent = function() {
        var
          that = this
        , $colorSetting = this.$elem.find("#" + this.id + "-colors")
        // li for colors
        , $colors = $colorSetting.find("li");

        // set initial background color again
        this.background = $colors.filter(".selected").data("color");

        // background color click
        $colorSetting.on("click", "li", function() {
            var $this = $(this), newBgColor;

            // update selected color
            $colors.removeClass("selected");
            $this.addClass("selected");

            // update widget background color
            newBgColor = $this.data("color");
            that.$elem.removeClass(that.background).addClass(newBgColor);

            // save the new background
            that.background = newBgColor;
        });
    };

    Plugin.fn.formSubmitEvent = function() {
        var
          that = this
        , $submit = this.$elem.find("#" + this.id + "-submit")
        , $cancel = this.$elem.find("#" + this.id + "-cancel");

        $submit.on("click", function(e) {
            e.preventDefault();

            // TODO submit form to server
            console.log("form submitted");

            // flip to default panel
            that.flipPanel();

            return;
        });

        $cancel.on("click", function(e) {
            e.preventDefault();
            // flip to default panel
            that.flipPanel();
        })
    };

    Plugin.fn.bindTitleEvents = function() {
        // bind setting event
        if (this.options.controls.setting) {
            this.currentPanel = this.options.initialized ? 0 : 1;
            // bind Event
            this.$control.find(".widget-setting").on("click", $.proxy(this.flipPanel, this));
        }

        // bind refresh event
        if (this.options.controls.refresh) {
            this.$control.find(".widget-refresh").on("click", $.proxy(this.refresh, this));
        }

        // bind fold event
        if (this.options.controls.fold) {
            this.$control.find(".widget-fold").on("click", $.proxy(this.foldPanel, this));
        }

        // bind remove event
        if (this.options.controls.remove) {
            this.$control.find(".widget-remove").on("click", $.proxy(this.hideWidget, this));
        }
    };

    Plugin.fn.flipPanel = function() {
        var curPanel = this.$panels.get(this.currentPanel)
          , nxtPanel = this.$panels.get(1 - this.currentPanel);

        if (this.$content.is(":hidden")) {
            if (this.currentPanel !== 1) { // not setting
                $(curPanel).hide();
                $(nxtPanel).show();
                // update the new current
                this.currentPanel = 1;
            }
            // slide down
            this.foldPanel();
        } else {
            // hide current
            $(curPanel).slideToggle();
            // show the other
            $(nxtPanel).slideToggle();
            // update the new current
            this.currentPanel = 1 - this.currentPanel;
        }
    };

    Plugin.fn.refresh = function() {
        window.console.log("Refreshing");
    };

    Plugin.fn.foldPanel = function() {
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

    Plugin.fn.hideWidget = function() {
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
