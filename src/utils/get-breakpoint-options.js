// @flow
import type { BreakpointOptions, SliderOptions } from "../types/SliderOptions";

export default (options: SliderOptions, innerWidth: number): BreakpointOptions => {
    let { visibleSlides, step } = options;

    const breakpoints = options.breakpoints;
    if (!breakpoints || !Object.keys(breakpoints).length) {
        return {
            visibleSlides,
            step
        };
    }

    return Object.keys(breakpoints).reduce((result: BreakpointOptions, breakpoint: string): BreakpointOptions => {
        return innerWidth >= parseInt(breakpoint, 10) ? {
            visibleSlides: breakpoints[breakpoint].visibleSlides || visibleSlides,
            step: breakpoints[breakpoint].step || step
        } : result;
    }, {
        visibleSlides,
        step
    });
};
