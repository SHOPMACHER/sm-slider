// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import slide from './slide';

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>
) => {
    const { visibleSlides } = store.getState();

    slide($ref, $slides, store, true);

    Array.prototype.forEach.call($slides.children, ($slide) => {
        $slide.style.flexBasis = `${100 / visibleSlides}%`;
    });
};
