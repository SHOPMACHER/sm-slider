import Slider from './core/Slider';
import './styles/main.less';

if (process.env.NODE_ENV === 'development' && module.hot) {
    console.clear();
    module.hot.accept();
}

const $sliders = document.querySelectorAll('[data-sm-slider]');
let $refs = [];

Array.prototype.forEach.call($sliders, ($slider) => {
    const options = JSON.parse($slider.getAttribute('data-sm-slider'));
    $refs.push(new Slider($slider, options));
});
