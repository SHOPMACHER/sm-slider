// @flow
import Store from "../utils/Store";
import type { SliderState } from "../types/SliderState";

export default (store: Store<SliderState>, slide: number, animate: boolean = true) => {
    const { visibleSlides, totalSlides, isInfinite } = store.getState();

    const isPrevDisabled = !isInfinite && slide === 0 || totalSlides <= visibleSlides;
    const isNextDisabled = !isInfinite && slide === totalSlides - visibleSlides || totalSlides <= visibleSlides;

    store.setState(prevState => ({
        currentSlide: slide,
        isNextDisabled,
        isPrevDisabled,
        animate
    }));
};
