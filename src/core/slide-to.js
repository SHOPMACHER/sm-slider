// @flow
import Store from "../utils/Store";
import type { SliderState } from "../types/SliderState";

export default (store: Store<SliderState>, slide: number, animate: boolean = true) => {
    const { visibleSlides, totalSlides, isInfinite, isClassActive, slidesWrapper } = store.getState();

    const isPrevDisabled = !isInfinite && slide === 0 || totalSlides <= visibleSlides;
    const isNextDisabled = !isInfinite && slide === totalSlides - visibleSlides || totalSlides <= visibleSlides;

    store.setState(prevState => ({
        currentSlide: slide,
        isNextDisabled,
        isPrevDisabled,
        animate
    }));

    const addActiveClass = $el => {
        const id = window.setTimeout(() => {
            $el?.classList.add('active');
            clearTimeout(id);
        }, 300); // the timeout here is the same transition timing
    };

    if (!isClassActive) {
        return;
    }

    let currentSlide = store.getState().currentSlide;
    const mainElementsLength = slidesWrapper?.querySelectorAll('.slide:not([data-sm-slider-duplicate])').length,
        slides = slidesWrapper?.querySelectorAll('.slide'),
        steps = store.getState().step;

    if (isInfinite) {
        currentSlide += steps > 1 ? steps : 1;
    }

    Array.prototype.forEach.call(slides, $slide => {
        $slide?.classList.remove('active');
        // If not isInfinite then give it a class without delay
        !isInfinite ? slides[currentSlide].classList.add('active') : addActiveClass(slides[currentSlide]);

        if (currentSlide >= mainElementsLength) {
            $slide?.classList.remove('active');
            let firstMainEle = slidesWrapper.querySelector('.slide[data-sm-slider-index="0"]:not([data-sm-slider-duplicate])'),
                $el = firstMainEle ? firstMainEle : slidesWrapper.querySelector('.slide[data-sm-slider-index="1"]:not([data-sm-slider-duplicate])');

            !isInfinite ? $el.classList.add('active') : addActiveClass($el);

            return;
        }

        if (currentSlide > 0) {
            return;
        }

        if (steps === 1) {
            const lastMainEle = slidesWrapper.querySelector('.slide[data-sm-slider-index="' + (mainElementsLength) + '"]:not([data-sm-slider-duplicate])'),
                  $el = lastMainEle ? lastMainEle : slidesWrapper.querySelector('.slide[data-sm-slider-index="' + (mainElementsLength - 1) + '"]:not([data-sm-slider-duplicate])');

            !isInfinite ? $el.classList.add('active') : addActiveClass($el);

            return;
        }

        if (steps > 1) {
            const lastMainEle = slidesWrapper.querySelector('.slide[data-sm-slider-index="' + (mainElementsLength - steps) + '"]:not([data-sm-slider-duplicate])'),
                  $el = lastMainEle ? lastMainEle : slidesWrapper.querySelector('.slide[data-sm-slider-index="' + (mainElementsLength - steps + 1) + '"]:not([data-sm-slider-duplicate])');

            !isInfinite ? $el.classList.add('active') : addActiveClass($el);
        }
    });
};
