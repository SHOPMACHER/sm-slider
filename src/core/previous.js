// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

import slideTo from './slide-to';

export default ($ref: HTMLElement, $slides: HTMLElement, store: Store<SliderState>, options: SliderOptions, isEventTrigger: boolean) => {
    const { currentSlide, step } = store.getState();

    let slideOffset = currentSlide !== 0 ? (currentSlide % step || step) : step;

    if (!isEventTrigger) {
        $ref.dispatchEvent(new CustomEvent('previous', {
            detail: {
                internal: true
            }
        }));
    }

    requestAnimationFrame(() => slideTo(store, currentSlide - slideOffset));
}
