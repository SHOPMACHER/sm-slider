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

const $sliders:NodeList<HTMLElement> = document.querySelectorAll('[data-sm-slider]');
let $refs:Array<Slider> = [];

Array.prototype.forEach.call($sliders, ($slider: HTMLElement) => {
    const optionString: ?string = $slider.getAttribute('data-sm-slider');
    if (!optionString) {
        return;
    }

    const options = JSON.parse(optionString);
    $refs.push(new Slider($slider, options));
});
