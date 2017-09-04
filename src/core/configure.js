// @flow
import type { SliderOptions } from "../types/SliderOptions";

export default ($slides: HTMLElement, options: SliderOptions) => {
    Array.prototype.forEach.call($slides.children, ($slide, index) => {
        $slide.setAttribute('data-sm-slider-index', index);
    });

    if (!options.infinite) {
        return;
    }

    const $prevSlides: Array<HTMLElement> = [];
    const $nextSlides: Array<HTMLElement> = [];

    const lastSlideIndex = $slides.children.length - 1;

    for (let i = 0; i < options.step; i++) {
        $prevSlides.push($slides.children[lastSlideIndex - i].cloneNode(true));
    }

    for (let i = 0; i < options.visibleSlides; i++) {
        $nextSlides.push($slides.children[i].cloneNode(true));
    }

    Array.prototype.forEach.call($prevSlides, ($slide, index) => {
        $slide.setAttribute('data-sm-slider-index', lastSlideIndex - index);
        $slides.insertBefore($slide, $slides.firstElementChild);
    });

    Array.prototype.forEach.call($nextSlides, ($slide, index) => {
        $slide.setAttribute('data-sm-slider-index', index);
        $slides.appendChild($slide);
    });
};