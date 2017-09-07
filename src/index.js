// @flow
import Slider from './Slider';
import 'custom-event-polyfill';

import './styles/main.less';

/**
 * Hot module replacement script for development.
 */
if (process.env.NODE_ENV === 'development' && module.hot) {
    console.clear();
    module.hot.accept();
}

global.smSlider = (function(context, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        context.returnExports = factory();
    }

    return factory();
})(window, () => Slider);
