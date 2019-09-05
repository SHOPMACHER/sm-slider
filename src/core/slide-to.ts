import Store from "../utils/Store";
import { SliderState } from '../types/SliderState';

export default (
    store: Store<SliderState>,
    slide: number,
    animate: boolean = true,
): void => {
    const { visibleSlides, totalSlides, isInfinite } = store.getState();

    const isPrevDisabled = !isInfinite && slide === 0
        || totalSlides <= visibleSlides;
    const isNextDisabled = !isInfinite && slide === totalSlides - visibleSlides
        || totalSlides <= visibleSlides;

    store.setState(() => ({
        currentSlide: slide,
        isNextDisabled,
        isPrevDisabled,
        animate
    }));
};
