# smSlider
smSlider is a library for creating responsive and slick sliders
that serve whatever content you want them to. The general philosophy is
to provide a flexible library in which to user can handle the styling
mostly by itself. This makes it easy, to customize the slider without
having to override a lot of library styles.
Basically the only styling provided is done for
the sake of animation and responsiveness.

## Table of Contents

* [Installation](#installation)
  * [UMD](#umd)
  * [AMD](#amd)
  * [CommonJS](#commonjs)
  * [ESM](#esm)
* [Usage](#usage)
  * [Markup](#markup)
  * [Global initialization](#globalinitilization)
  * [Single initilization](#singleinitilization)
  * [Options](#options)
  * [Responsiveness](#responsiveness)
  * [Vertical slides](#vertical-slides)
  * [Events](#events)
    * [Attaching a listener](#attachingalistener)
    * [Dispatching an event](#dispatchinganevent)
* [Todo](#todo)
* [Contributing](#contributing)
* [License](#license)

## Installation
Run `npm install -S sm-slider` to install the package from npm.
Alternatively, you can download the latest release from this repository.

To include the library, refer to the module definition you are using.

### UMD
Include the `sm-slider.js` and `sm-slider.css` from the `lib` directory
in your project. This makes `smSlider` available in the global scope.

### AMD
Adjust your `require.config.js` to include the following code:
```javascript
packages: [{
    name: 'smSlider',
    location: 'node_modules/sm-slider/lib',
    main: 'sm-slider'
}]
```

Now you can use the slider in your project like this:
```javascript
define('myModule', ['smSlider'], function(smSlider) {
    // Access smSlider object here
});
```

### CommonJS
Require the slider via `const smSlider = require('sm-slider');` and use
the `smSlider` variable to access its methods.

### ESM
Import the slider via `import smSlider from 'sm-slider';` and access it
via the `smSlider` variable.

## Usage
To use the slider, you first want to create some basic HTML markup and
then initialize the slider via the JavaScript API.

### Markup
```html
<div class="sm-slider" data-sm-slider="{}">
    <div class="slides-wrapper">
        <div class="slides">
            <div class="slide">
                Slide 1
            </div>
            <div class="slide">
                Slide 2
            </div>
            <div class="slide">
                Slide 3
            </div>
        </div>
    </div>
</div>
```

In this example, you can pass options via the `data-sm-slider` attribute.
For a list of possible options, refer to [Options](#options).

### Slider arrows
As you might want to add arrows to the slider for the user to navigate,
you can include them by altering the above markup as follows:

```html
<div class="sm-slider" data-sm-slider="{}">
    <div class="arrow-left"></div>
    <div class="slides-wrapper">
        <div class="slides">
            <div class="slide">
                Slide 1
            </div>
            <div class="slide">
                Slide 2
            </div>
            <div class="slide">
                Slide 3
            </div>
        </div>
    </div>
    <div class="arrow-right"></div>
</div>
```

The arrow-elements will provide a clickable container that can be used
to move to the next/previous slides. By default, the arrows are next to
the slides. If you want the arrows to be on the actual slide, you can
add the `inset` class to the arrow.

```html
<div class="arrow-left inset"></div>
```

### Navigation dots
The slider supports a navigation that displays which slide you are
currently on. To enable it, simply insert an element with the `dot-nav`
class into your DOM.

```html
<div class="sm-slider" data-sm-slider="{}">
    <div class="arrow-left"></div>
    <div class="slides-wrapper">
        <div class="slides">
            <div class="slide">
                Slide 1
            </div>
            <div class="slide">
                Slide 2
            </div>
            <div class="slide">
                Slide 3
            </div>
        </div>
    </div>
    <div class="arrow-right"></div>
    <div class="dot-nav"></div>
</div>
```

### Text Navigation
The slider supports a text navigation that displays which slide you are 
currently on with a custom text. To enable it, simply insert an element with the `text-nav-wrapper`
class into your DOM. As children of this element you should insert elements with the `text-nav` class
and a  `data-sm-slider-ref` Attribute.
To make a reference to the slide you should insert a `data-sm-slider-hash` Attribute 
with the same value as the `data-sm-slider-ref` Attribute to the slides you want to reference on.
```html
<div class="sm-slider" data-sm-slider='{}'>
    <div class="arrow-left"><</div>
    <div class="slides-wrapper">
        <div class="slides">
            <div class="slide" data-sm-slider-hash="zero"></div>
            <div class="slide" data-sm-slider-hash="one">
                <div>
                    <img src="//placehold.it/1180x500">
                </div>
            </div>
            <div class="slide" data-sm-slider-hash="two">
                <img src="//placehold.it/1180x400">
            </div>
        </div>
    </div>
    <div class="arrow-right"><</div>
    <!--<div class="dot-nav"></div>-->
    <div class="text-nav-wrapper">
        <a class="text-nav" data-sm-slider-ref="zero">Slide 0</a>
        <a class="text-nav" data-sm-slider-ref="one">Slide 1</a>
        <a class="text-nav" data-sm-slider-ref="two">Slide 2</a>
    </div>
</div>
```

### Global initialization
You can initialize all sliders on a page, by using
```javascript
smSlider.init();
```

This method will initialize all target all element that have a the
`data-sm-slider` attribute and try to initialize them as a slider.

### Single initialization
If you want to target a specific slider, you can use the class constructor
to initialize it. This is the preferred approach if you want more control
over the slider and call functions on it (e.g. to switch slides from your script).

```javascript
var $sliderRef = document.querySelector('.sm-slider');
var slider = new smSlider($sliderRef, options);
```

_Note:_ the DOM element you target is not required to have the
`data-sm-slider` attribute, since options are passed in via the
constructor.

### Options
The `options` object that you either pass in via the `data-sm-slider`
attribute or the contructor can consist of the following options:

| Option        | Description                                                   | Type     | Default Value | Responsive |
| ------------- | ------------------------------------------------------------- | -------- | -------------:| ----------:|
| visibleSlides | Number of simultaneosly visible slides                        | number   | 1             |        yes |
| step          | Number of slides, the slider progresses with one slide action | number   | 1             |        yes |
| infinite      | True, if the slides should repeat upon reaching the end       | boolean  | false         |            |
| autoplay      | Time in milliseconds for the slides to switch automatically   | number   | 0             |            |
| breakpoints   | See [Responsiveness](#responsiveness)                     | Object   | undefined     |            |
| offsetLet     | Value between 0 and 1 that controls, how much of the last slide is visible on the left. | number | 0 | yes |
| showEmptySlides | False, if empty slides should be hidden                     | boolean   | true
| disabledSwipe | True, if touch swiping should be disabled                      | boolean   | false 

### Responsiveness
smSlider is built to fit different device sizes using the `breakpoints` option.
The `breakspoints` option consists of a key/value pair that can override
all default options that have a `yes` in the field for responsiveness in the
options table above.

*Example*
```javascript
var options = {
    "visibleSlides": 1,
    "breakpoints": {
        "768": {
            "visibleSlides": 2
        }
    }
};
```

The above configuration will make the slider display 1 slide by default and 2 slides when exceeding
the 768px device-width breakpoint (i.e. tablet devices).

### Vertical slides
smSlider also supports vertical alignment of slides, instead of the usual horizonal one.
In order to transform the slider into a vertical one, the element with the `sm-slider` class
needs to be assigned the `sm-slider--vertical` class as well.

Please note that for best results, the following cases should apply:
 * The parent of `sm-slider` has either display flex, inline or inline-block
 * The content of the `slide` class has a fixed height
   * The dynamic height calculation is going to be adressed in the upcoming releases!

### Events
smSlider uses custom events to both notify the listener of specific actions,
as well as listening to specific events itself. The following list shows
the events that are implemented at the moment.

`Attachable` means, that a listener can be attached to handle the event, whereas
`Dispatchable` means that the event can be triggered on the slider. `Value` describes
the contents of `event.detail` either to process in the handler or when the event
is dispatched.

| Event     | Description                            | Attachable | Dispatchable | Value                                             |
| --------- | ---------------------------------------| ----------:| ------------:| ------------------------------------------------- |
| next      | Switches to the next slide             | no         | yes          | undefined                                         |
| previous  | Switches to the previous slide         | no         | yes          | undefined                                         |
| slide     | Switches to a specific slide           | yes        | yes          | `to: number` (index of slide that is switched to) |

#### Attaching a listener
Eventlisteners can be attached in two ways: either using the reference to the class instance of the slider
or attaching it to the root DOM element that contains the `data-sm-slider`.

**Class instance reference**
```javascript
var slider = new smSlider($element, options);
slider.addEventListener(event, handler, options);
```

**DOM element reference**
```javascript
var $sliderElement = document.querySelector('.sm-slider');
$sliderElement.addEventListener(event, handler, options);
```

#### Dispatching an event
Using the same references as described above, it is possible to dispatch
events that the slider listens to.

```javascript
var slider = new smSlider($element, options);
slider.dispatchEvent(new CustomEvent('slide', {
    detail: {
        to: 2 // index to slide to
    }
}));
```

## Todo
- [x] Configure number of visible slides
- [x] Configure step size when sliding
- [x] Configure infinite sliding
- [x] Configure responsive breakpoints
- [x] Handle resizes and orientation changes
- [x] Touch support
- [x] Custom events
- [x] Autoplay
- [x] Implement vertical slides support
- [ ] Fix automatic height calculation on vertical slides
- [ ] Lazy loading of images
- [ ] Configure animation speed
- [ ] Provide different timing functions

## Contributing
To contribute to this project, fork the repository and create
your feature/hotfix branch with whatever you want to add.

Install the project dependencies using `npm i` and start the
development server via `npm start`. A webpack-dev-server will now
listen on port 8080.

When you are finished developing, make sure to add a documented pull
request.

**Please note:** Pull requests for new features that are not typed via
flowtype as well as not following the general code style used in this
project will be rejected.

## License
MIT
