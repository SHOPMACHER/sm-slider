// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

export default ($slides: HTMLElement, store: Store<SliderState>, options: SliderOptions) => {
    const { currentSlide, totalSlides, innerWidth, complete } = store.getState();



    if (totalSlides - (currentSlide + options.step) < options.visibleSlides) {
        console.error('APPEND!');

        if (!options.infinite) {
            return;
        }

        let f = 1;

        $slides.appendChild($slides.firstElementChild);
        if (complete) {
            f = options.visibleSlides;

            for (let i = 1; i < options.visibleSlides; i++) {
                $slides.appendChild($slides.firstElementChild);
            }
        }

        const as = options.visibleSlides - (totalSlides - (currentSlide + options.step));

        $slides.classList.remove('animatable');
        $slides.style.transform = `translateX(${-(innerWidth / options.visibleSlides) * (currentSlide - (as * f))}px)`;

        requestAnimationFrame(() => store.setState(prevState => ({
            currentSlide,
            complete: true
        })));
    } else {
        store.setState(prevState => ({
            currentSlide: prevState.currentSlide + options.step,
            complete: false
        }));
    }

    console.log('As', `${totalSlides} - ${currentSlide} = ${totalSlides - currentSlide}`);
}
