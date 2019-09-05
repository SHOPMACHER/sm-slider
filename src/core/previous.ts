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

    _slideTo = !options.infinite && currentSlide - slideOffset <= 0
        ? 0
        : currentSlide - slideOffset;

    requestAnimationFrame(() => slideTo(store, _slideTo));
}
