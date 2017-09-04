// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

import slideTo from './slide-to';

export default ($slides: HTMLElement, store: Store<SliderState>, options: SliderOptions) => {
    const { currentSlide } = store.getState();
    const { step } = options;

    let slideOffset = currentSlide !== 0 ? (currentSlide % step || step) : step;

    requestAnimationFrame(() => slideTo(store, currentSlide - slideOffset));
}
