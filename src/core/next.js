// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

export default ($slides: HTMLElement, store: Store<SliderState>, options: SliderOptions) => {
    const { currentSlide, totalSlides, innerWidth } = store.getState();
    const { visibleSlides, step } = options;

    const isInfinityWrap = currentSlide === totalSlides;
    let slideOffset = currentSlide + step > totalSlides ? totalSlides - currentSlide : step;

    // 4 + 2 > 5 ==> 5 - 4
    // currentSlide + step > totalSlides ==> totalSlides - currentSlide

    if (isInfinityWrap) {
        $slides.classList.remove('animatable');
        $slides.style.transform = `translateX(${-(innerWidth / visibleSlides) * step}px`;
    }

    requestAnimationFrame(() => {
        store.setState(prevState => ({
            currentSlide: !isInfinityWrap ? prevState.currentSlide + slideOffset : step
        }));
    });
}
