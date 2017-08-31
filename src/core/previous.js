// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

export default ($slides: HTMLElement, store: Store<SliderState>, options: SliderOptions) => {
    const { currentSlide, totalSlides, innerWidth } = store.getState();
    const { visibleSlides, step } = options;

    const isInfinityWrap = currentSlide === -step;
    let slideOffset = currentSlide !== 0 ? (currentSlide % step || step) : step;

    if (isInfinityWrap) {
        $slides.classList.remove('animatable');
        $slides.style.transform = `translateX(${-(innerWidth / visibleSlides) * totalSlides}px)`;
    }

    requestAnimationFrame(() => {
        store.setState(prevState => ({
            currentSlide: !isInfinityWrap ? prevState.currentSlide - slideOffset : totalSlides - 2 * slideOffset
        }));
    });
}
