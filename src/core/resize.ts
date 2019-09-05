import Store from '../utils/Store';
import slide from './slide';
import { SliderState } from '../types/SliderState';

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>,
): void => {
    const { innerSize, visibleSlides, isVertical } = store.getState();
    const sizeAttribute = isVertical ? 'height' : 'width';

    slide($ref, $slides, store, true);

    Array.prototype.forEach.call($slides.children, ($slide) => {
        $slide.style[sizeAttribute] =
            `${Math.round(innerSize / visibleSlides)}px`;
    });
};
