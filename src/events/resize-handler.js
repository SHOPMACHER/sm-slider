// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from "../types/SliderOptions";
import getInnerWidth from '../utils/get-inner-width';
import getBreakpointOptions from '../utils/get-breakpoint-options';

export default (
    $slider: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement
) => {
    const innerWidth = getInnerWidth($slider, $arrowLeft, $arrowRight);
    const { totalSlides } = store.getState();
    const { visibleSlides, step } = getBreakpointOptions(options, window.innerWidth);

    store.setState(prevState => ({
        innerWidth,
        visibleSlides,
        step,
        isSlidingDisabled: totalSlides < visibleSlides
    }));
}
