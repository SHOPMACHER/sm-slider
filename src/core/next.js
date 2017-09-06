// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

import slideTo from './slide-to';

export default ($ref: HTMLElement, $slides: HTMLElement, store: Store<SliderState>, options: SliderOptions, isEventTrigger: boolean) => {
    const { currentSlide, totalSlides } = store.getState();
    const { step } = options;

    let slideOffset = currentSlide + step > totalSlides ? totalSlides - currentSlide : step;

    if (!isEventTrigger) {
        $ref.dispatchEvent(new CustomEvent('next', {
            detail: {
                internal: true
            }
        }));
    }

    requestAnimationFrame(() => slideTo(store, currentSlide + slideOffset));
}
