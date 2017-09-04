// @flow
export type SliderOptions = {
    infinite?: boolean,
    visibleSlides: number,
    step: number,
    breakpoints?: {[key: string]: BreakpointOptions}
};

export type BreakpointOptions = {
    visibleSlides?: number,
    step?: number
};
