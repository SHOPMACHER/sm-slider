// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from "../types/SliderOptions";
import getInnerSize from '../utils/get-inner-size';
import getBreakpointOptions from '../utils/get-breakpoint-options';

export default (
    $slider: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement
) => {
    const { totalSlides, isVertical, currentSlide, isInfinite } = store.getState();
    const { visibleSlides, step } = getBreakpointOptions(options, window.innerWidth);
    const innerSize = getInnerSize($slider, $arrowLeft, $arrowRight, isVertical);

    const isPrevDisabled = currentSlide === 0 && !isInfinite;
    const isNextDisabled = totalSlides <= visibleSlides || currentSlide + visibleSlides === totalSlides;

    store.setState(prevState => ({
        innerSize,
        visibleSlides,
        step,
        isNextDisabled,
        isPrevDisabled
    }));
}
