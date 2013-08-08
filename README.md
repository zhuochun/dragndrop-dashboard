*The source code is not hosted here (of the widgets part).*

# Widgets-Based Dashboard

Widgets-Based Dashboard is a simplified iGoogle/JIRA alike single-page dashboard that supports widgets, drag-and-drop etc.

In the dashboard page, each widget is considered as an individual HTML and JavaScript application that is sandboxed in the dashboard platform.

The basic front-end components (JavaScript) of this dashboard is completed by me during my internship at `Autodesk Build and Release Tool Team (Singapore)`.

Here are a few screenshots:

![Dashboard](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/01.png)

![Widget Directory](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/02.png)

# Resouces

It is build with JavaScript, jQuery, RequireJS, Handlebars and ASP.NET MVC 4 (backend).

# Implementing a Widget

## Widget Basics

Each type of widgets in the dashboard extends the `widgetCategory` class and interact with the server through the predefined AJAX API wrappers. Widgets added to a dashboard will be loaded after the `Dashbaord` JavaScript executed. Communications between dashboard and widgets are implemented by a `Publish/Subscribe pattern` to prevent direct dependencies.

Widgets are located under folder `widgets\<widget_name>` with 3 compulsory files:

- `package.json`: description of the widget
- `index.js`: the code of the widget
- `screenshot.png`: a small image to be displayed in widget category

## Example: Hello World Widget

![Hello World Display](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/04.png)
![Hello World Setting](https://raw.github.com/zhuochun/dragndrop-dashboard/master/screenshots/03.png)

This is a `hello world` widget that include features like saving and loading the widget settings, customized message `input box` data to server.

Full source code in implementing it (`widgets/helloworld/index.js`):

```javascript
define(function(require, exports) {

    var
    // include the base widget category
      Category = require("widgetCategory")
    // declare this widget category
    , helloWorld = new Category();

    // set the defaults settings for this widget
    helloWorld.setDefaults("helloWorld", {
        initialized: true // no need to customize settings at start
      , message: "Waha" // widget's default variables
    });

    // implement the essential components in a widget
    helloWorld.include({
          // the content page, return a DOM object
          // you can load custom handlebars template as well
          renderContent : function() {
            return $("<div>").html("<h1>" + this.get("Settings").message + "</h1><p>Hello World, oh Hello World.</p>");
        }
          // the setting page, return a DOM object
        , renderSetting : function() {
            var $div = $("<div>").addClass("control-group");

            $div.append(
                "<label class='control-label' for='message-" +
                this.data.Id + "'>Message</label>");

            // create a message input box
            $div.append(
                $("<div>").addClass("controls").append(
                    "<input class='input-xlarge focused' id='message-" +
                    this.data.Id + "' type='text' value='" +
                    this.get("Settings").message + "' required>")
            );

            return $div;
        }
          // the save action when settings are saved
        , save : function() {
            // change the widget variable
            this.set("message", $("#message-" + this.data.Id).val());
            // use ajax api provided to update the data
            this.ajax.update(this.data);
        }
          // the remove actiont when a widget is removed from dashboard
        , remove : function() {
            window.alert("Good Bye!");
        }
    });

    // must have in order to be loaded by dashboard js
    return helloWorld;

});
```

`renderContent` and `renderSetting` also support `Handlebars` templates.
