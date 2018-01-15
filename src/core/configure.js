// @flow
import Store from '../utils/Store';
import type { SliderOptions } from "../types/SliderOptions";
import type { SliderState } from '../types/SliderState';

export default ($slides: HTMLElement, options: SliderOptions, store: Store<SliderState>) => {
    const { step, visibleSlides } = store.getState();

    if (!options.infinite) {
        return;
    }

    const $prevSlides: Array<HTMLElement> = [];
    const $nextSlides: Array<HTMLElement> = [];

    const lastSlideIndex = $slides.children.length - 1;

    for (let i = 0; i < step; i++) {
        $prevSlides.push($slides.children[lastSlideIndex - i].cloneNode(true));
    }

    for (let i = 0; i < visibleSlides; i++) {
        $nextSlides.push($slides.children[i].cloneNode(true));
    }

    Array.prototype.forEach.call($prevSlides, ($slide, index) => {
        $slide.setAttribute('data-sm-slider-index', lastSlideIndex - index);
        $slide.setAttribute('data-sm-slider-duplicate', true);
        $slides.insertBefore($slide, $slides.firstElementChild);
    });

    Array.prototype.forEach.call($nextSlides, ($slide, index) => {
        $slide.setAttribute('data-sm-slider-index', index);
        $slide.setAttribute('data-sm-slider-duplicate', true);
        $slides.appendChild($slide);
    });
};
