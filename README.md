# smSlider
smSlider is a library for creating responsive and slick sliders
that serve whatever content you want them to.

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
  * [Events](#events)
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
paths: {
    smSlider: 'node_modules/sm-slider/sm-slider'
}
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
| breakpoints   | See [Responsiveness](#responsiveness)                         | Object   | undefined     |            |

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

### Events

## Todo

## Contributing

## License
MIT
