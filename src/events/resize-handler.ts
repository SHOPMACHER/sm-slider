import Store from '../utils/Store';
import getInnerSize from '../utils/get-inner-size';
import getBreakpointOptions from '../utils/get-breakpoint-options';
import { SliderState } from '../types/SliderState';
import { SliderOptions } from '../types/SliderOptions';

export default (
    $slider: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions,
    $arrowLeft: HTMLElement,
    $arrowRight: HTMLElement,
): void => {
    const { totalSlides, isVertical, currentSlide, isInfinite } = store.getState();
    const { visibleSlides, step } = getBreakpointOptions(options, window.innerWidth);
    const innerSize = getInnerSize($slider, $arrowLeft, $arrowRight, isVertical);

    const isPrevDisabled = currentSlide === 0 && !isInfinite;
    const isNextDisabled = totalSlides <= visibleSlides || currentSlide + visibleSlides === totalSlides;

    store.setState(() => ({
        innerSize,
        visibleSlides,
        step,
        isNextDisabled,
        isPrevDisabled,
    }));
}
