import Store from '../utils/Store';

import slideTo from './slide-to';
import { SliderState } from '../types/SliderState';
import { SliderOptions } from '../types/SliderOptions';

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions,
    isEventTrigger: boolean,
): void => {
    const {
        currentSlide,
        totalSlides,
        step,
        visibleSlides,
        isInfinite
    } = store.getState();

    let _slideTo = 0;

    let slideOffset =
        currentSlide + step > totalSlides ? totalSlides - currentSlide : step;

    if (!isEventTrigger) {
        $ref.dispatchEvent(new CustomEvent('next', {
            detail: {
                internal: true,
            },
        }));
    }

    _slideTo = currentSlide + slideOffset;

    if (!isInfinite && _slideTo >= totalSlides - visibleSlides) {
        _slideTo = totalSlides - visibleSlides;
    }

    requestAnimationFrame(() => slideTo(store, _slideTo));
}
