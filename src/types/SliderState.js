// @flow
export type SliderState = {
    currentSlide: number,
    totalSlides: number,
    innerWidth: number,
    visibleSlides: number,
    step: number,
    isPrevDisabled: boolean,
    isNextDisabled: boolean,
    isSlidingDisabled: boolean
};
