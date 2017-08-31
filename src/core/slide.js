// @flow
import Store from '../utils/Store';
import type { SliderOptions } from '../types/SliderOptions';
import type { SliderState } from '../types/SliderState';

export default (
    $slides: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions,
    animate: boolean = true
) => {
    const { currentSlide, innerWidth } = store.getState();
    const { visibleSlides, step } = options;

    if (animate) {
        $slides.classList.add('animatable');
    } else {
        $slides.classList.remove('animatable');
    }

    // TODO: reimplement after infinity
    // store.setState(prevState => ({
    //     isPrevDisabled: currentSlide === 0,
    //     isNextDisabled: currentSlide + 1 === totalSlides
    // }));

    $slides.style.transform = `translateX(${-(innerWidth / visibleSlides) * currentSlide}px)`;
};
