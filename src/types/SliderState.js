// @flow
export type SliderState = {
    currentSlide: number,
    totalSlides: number,
    innerSize: number,
    visibleSlides: number,
    step: number,
    offsetLeft: number,
    isPrevDisabled: boolean,
    isNextDisabled: boolean,
    isSlidingDisabled: boolean,
    isVertical: boolean
};
