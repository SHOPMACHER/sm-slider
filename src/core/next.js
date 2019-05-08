// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

import slideTo from './slide-to';

export default ($ref: HTMLElement, $slides: HTMLElement, store: Store<SliderState>, options: SliderOptions, isEventTrigger: boolean) => {
    const { currentSlide, totalSlides, step, visibleSlides, isInfinite } = store.getState();
    let _slideTo = Number;

    let slideOffset = currentSlide + step > totalSlides ? totalSlides - currentSlide : step;

    if (!isEventTrigger) {
        $ref.dispatchEvent(new CustomEvent('next', {
            detail: {
                internal: true
            }
        }));
    }

    _slideTo = currentSlide + slideOffset ;

    if (!isInfinite && _slideTo >= totalSlides - visibleSlides) {
        _slideTo = totalSlides - visibleSlides;
    }

    requestAnimationFrame(() => slideTo(store,  _slideTo));
}
