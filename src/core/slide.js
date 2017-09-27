// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>,
    preventAnimation: boolean = false
) => {
    const { currentSlide, innerWidth, totalSlides, animate, visibleSlides, step } = store.getState();

    let targetSlide = currentSlide;
    if (currentSlide === totalSlides) {
        targetSlide = 0;
    } else if (currentSlide < 0) {
        targetSlide = totalSlides - step;
    }

    if (animate && !preventAnimation) {
        $slides.classList.add('animatable');
        $slides.addEventListener('transitionend', () => {
            $slides.classList.remove('animatable');
            if (currentSlide === totalSlides || currentSlide < 0) {
                store.setState(prevState => ({
                    currentSlide: targetSlide,
                    animate: false
                }));
            }
        }, { once: true });

        $ref.dispatchEvent(new CustomEvent('slide', {
            detail: {
                to: targetSlide,
                internal: true
            }
        }));
    }

    const slideWidth = innerWidth / visibleSlides;
    $slides.style.transform = `translateX(${-(slideWidth * currentSlide) - slideWidth * step}px)`;
};
