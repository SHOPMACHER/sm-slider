import { BreakpointOptions, SliderOptions } from '../types/SliderOptions';

export default (options: SliderOptions, innerSize: number): BreakpointOptions => {
    let { visibleSlides, step, offsetLeft } = options;

    const breakpoints = options.breakpoints;
    if (!breakpoints || !Object.keys(breakpoints).length) {
        return {
            visibleSlides,
            step,
            offsetLeft
        };
    }

    return Object.keys(breakpoints).reduce((result: BreakpointOptions, breakpoint: string): BreakpointOptions => {
        return innerSize >= parseInt(breakpoint, 10) ? {
            visibleSlides: breakpoints[breakpoint].visibleSlides || visibleSlides,
            step: breakpoints[breakpoint].step || step,
            offsetLeft: breakpoints[breakpoint].offsetLeft || offsetLeft
        } : result;
    }, {
        visibleSlides,
        step,
        offsetLeft
    });
};
