// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

export default ($slides: HTMLElement, store: Store<SliderState>, options: SliderOptions) => {
    const { currentSlide, totalSlides, innerWidth } = store.getState();
    const isInfinityWrap = currentSlide === -options.step;

    let slideOffset = currentSlide % options.step || options.step;

    if (isInfinityWrap) {
        $slides.classList.remove('animatable');
        $slides.style.transform = `translateX(${-(innerWidth / options.visibleSlides) * totalSlides}px)`;
    }

    requestAnimationFrame(() => {
        store.setState(prevState => ({
            currentSlide: !isInfinityWrap ? prevState.currentSlide - slideOffset : totalSlides - 2 * slideOffset
        }));
    });
}
