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

Slider.init();

(function() {

    const $main = document.querySelector('#mainslider');
    const $thumb = document.querySelector('#thumbslider');

    if (!$main || !$thumb) {
        return;
    }

    $main.addEventListener('next', (event: any) => {
        if (event.detail && event.detail.external) {
            return;
        }

        $thumb.dispatchEvent(new CustomEvent('next', {
            detail: { external: true }
        }));
    });

    $main.addEventListener('previous', () => {
        if (event.detail && event.detail.external) {
            return;
        }

        $thumb.dispatchEvent(new CustomEvent('previous', {
            detail: { external: true }
        }));
    });

    $thumb.addEventListener('next', () => {
        if (event.detail && event.detail.external) {
            return;
        }

        $main.dispatchEvent(new CustomEvent('next', {
            detail: { external: true }
        }));
    });

    $thumb.addEventListener('previous', () => {
        if (event.detail && event.detail.external) {
            return;
        }

        $main.dispatchEvent(new CustomEvent('previous', {
            detail: { external: true }
        }));
    });

    Array.prototype.forEach.call($thumb.querySelectorAll('.slide'), $slide => {
        $slide.addEventListener('click', () => {
            const index = $slide.getAttribute('data-sm-slider-index');
            $main.dispatchEvent(new CustomEvent('slide', {
                detail: {
                    to: parseInt(index, 10),
                    external: true
                }
            }));
        });
    });
})();
