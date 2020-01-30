// @flow
export type SliderOptions = {
    infinite?: boolean,
    visibleSlides: number,
    step: number,
    offsetLeft: number,
    autoplay?: number,
    breakpoints?: {[key: string]: BreakpointOptions},
    showEmptySlides?: boolean,
    disabledSwipe?:boolean,
    activeClass?:boolean
};

export type BreakpointOptions = {
    visibleSlides?: number,
    step?: number,
    offsetLeft: number
};
