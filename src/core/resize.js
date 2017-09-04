// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import slide from './slide';

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>
) => {
    const { innerWidth, visibleSlides } = store.getState();

    slide($ref, $slides, store);

    Array.prototype.forEach.call($slides.children, ($slide) => {
        $slide.style.width = `${innerWidth / visibleSlides}px`;
    });
};
