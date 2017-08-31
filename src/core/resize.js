// @flow
import Store from '../utils/Store';
import type { SliderOptions } from '../types/SliderOptions';
import type { SliderState } from '../types/SliderState';
import slide from './slide';

export default (
    $slides: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions
) => {
    slide($slides, store, options, false);

    Array.prototype.forEach.call($slides.children, ($slide) => {
        $slide.style.width = `${store.getState().innerWidth / options.visibleSlides}px`;
    });
};
