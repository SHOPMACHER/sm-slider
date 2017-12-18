// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import once from '../utils/event-listener-once';

function transitionEnd(
    store: Store<SliderState>,
    $slides: HTMLElement,
    currentSlide: number,
    totalSlides: number,
    targetSlide: number
) {
    $slides.classList.remove('animatable');

    if (currentSlide === totalSlides || currentSlide < 0) {
        store.setState(prevState => ({
            currentSlide: targetSlide,
            animate: false
        }));
    }
}

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>,
    preventAnimation: boolean = false
) => {
    const {
        currentSlide,
        innerSize,
        totalSlides,
        animate,
        visibleSlides,
        offsetLeft,
        step,
        isVertical
    } = store.getState();

    let targetSlide = currentSlide;
    if (currentSlide === totalSlides) {
        targetSlide = 0;
    } else if (currentSlide < 0) {
        targetSlide = totalSlides - step;
    }

    if (animate && !preventAnimation) {
        $slides.classList.add('animatable');
        once($slides, 'transitionend', transitionEnd.bind(undefined, store, $slides, currentSlide, totalSlides, targetSlide));

        $ref.dispatchEvent(new CustomEvent('slide', {
            detail: {
                to: targetSlide,
                internal: true
            }
        }));
    }

    const translateProp = isVertical ? 'translateY' : 'translateX';

    const sliderSize = innerSize / visibleSlides;
    $slides.style.transform = totalSlides > visibleSlides
        ? `${translateProp}(${(-(sliderSize * currentSlide) - sliderSize * step) + (offsetLeft * sliderSize)}px)`
        : `${translateProp}(0)`;
};
