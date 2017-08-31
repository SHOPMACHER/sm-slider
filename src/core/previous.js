// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

export default ($slides: HTMLElement, store: Store<SliderState>, options: SliderOptions) => {
    const { currentSlide, innerWidth } = store.getState();

    if (currentSlide === 0) {
        if (!options.infinite) {
            return;
        }

        $slides.insertBefore($slides.lastElementChild, $slides.firstElementChild);

        $slides.classList.remove('animatable');
        $slides.style.transform = `translateX(${-innerWidth}px)`;

        requestAnimationFrame(() => store.setState(prevState => ({
            currentSlide
        })));
    } else {
        store.setState(prevState => ({
            currentSlide: prevState.currentSlide - options.step
        }));
    }
}
