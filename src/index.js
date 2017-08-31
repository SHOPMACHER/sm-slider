// @flow
import Slider from './Slider';

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
    const options = JSON.parse($slider.getAttribute('data-sm-slider'));
    $refs.push(new Slider($slider, options));
});
