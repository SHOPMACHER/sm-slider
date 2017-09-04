// @flow
import Store from "../utils/Store";
import type { SliderState } from "../types/SliderState";

export default (store: Store<SliderState>, slide: number, animate: boolean = true) => {
    store.setState(prevState => ({
        currentSlide: slide,
        animate
    }));
};
