// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

import slideTo from './slide-to';

export default ($ref: HTMLElement, $slides: HTMLElement, store: Store<SliderState>, options: SliderOptions, isEventTrigger: boolean) => {
    const { currentSlide, step } = store.getState();

    let _slideTo = 0;

    let slideOffset = currentSlide !== 0 ? (currentSlide % step || step) : step;

    if (!isEventTrigger) {
        $ref.dispatchEvent(new CustomEvent('previous', {
            detail: {
                internal: true
            }
        }));
    }

    !options.infinite && currentSlide - slideOffset <= 0 ? _slideTo = 0 : _slideTo = currentSlide - slideOffset;

    requestAnimationFrame(() => slideTo(store, _slideTo));
}
