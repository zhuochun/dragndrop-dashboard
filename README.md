# Widgets-Based Dashboard

Widgets-Based Dashboard is a simplified iGoogle/JIRA alike single-page dashboard that supports widgets, drag-and-drop etc.

In the dashboard page, each widget is considered as an individual HTML and JavaScript application that is sandboxed in the dashboard platform.

The basic front-end components of this dashboard is completed during my internship at Autodesk BRE Team. Here is a few screenshots:

![Dashboard](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/01.png)

![Widget Directory](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/02.png)

# Implement a Widget

All widgets in the dashboard need to extend the `widget base` class and can only interact with the server through the predefined API wrappers. Furthermore, communications between dashboard and widgets are implemented by a `Publish/Subscribe pattern` to prevent direct dependencies.

## Hello World Widget

![Hello World Display](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/04.png)
![Hello World Setting](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/03.png)

This is a `hello world` widget that include features like saving and loading the widget settings, customized message `input box` data to server.

To implement it:

```javascript
define(function(require, exports) {

    "use strict";
    /*jshint browser:true, jquery:true, laxcomma:true, maxerr:50*/

    var
    // include the base widget category
      Category = require("widgetCategory")
    // declare this widget category
    , helloWorld = new Category();

    // set the defaults settings for this widget
    helloWorld.setDefaults("helloWorld", {
        initialized: true // no need to customize settings at start
      , message: "Waha"
    });

    // overwrite all category implementation specific to this category
    helloWorld.include({
          renderContent : function() {
            return $("<div>").html("<h1>" + this.get("Settings").message + "</h1><p>Hello World, oh Hello World.</p>");
        }
        , renderSetting : function() {
            var $div = $("<div>").addClass("control-group");

            $div.append(
                "<label class='control-label' for='message-" +
                this.data.Id + "'>Message</label>");

            $div.append(
                $("<div>").addClass("controls").append(
                    "<input class='input-xlarge focused' id='message-" +
                    this.data.Id + "' type='text' value='" +
                    this.get("Settings").message + "' required>")
            );

            return $div;
        }
        , save : function() {
            this.set("message", $("#message-" + this.data.Id).val());
            this.ajax.update(this.data);
        }
        , remove : function() {
            window.alert("Good Bye!");
        }
    });

    return helloWorld;

});
```

`renderContent` and `renderSetting` also support `Handlebars` templates.
