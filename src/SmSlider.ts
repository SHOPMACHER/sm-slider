import { SliderState } from './types/SliderState';
import { SliderOptions } from './types/SliderOptions';
import { Nullable } from './types/Nullable';

import Store from './utils/Store';
import * as errors from './utils/errors';
import initSlides from './core/init-slides';
import clean from './core/clean';
import getInnerSize from './utils/get-inner-size';
import getBreakpointOptions from './utils/get-breakpoint-options';

const defaultOptions: SliderOptions = {
    infinite: false,
    visibleSlides: 1,
    step: 1,
    offsetLeft: 0,
    autoplay: 0,
    showEmptySlides: true,
    disabledSwipe: false,
};

const defaultState: SliderState = {
    currentSlide: 0,
    innerSize: 0,
    totalSlides: 0,
    step: 1,
    visibleSlides: 1,
    offsetLeft: 0,
    isNextDisabled: false,
    isPrevDisabled: false,
    isVertical: false,
    isInfinite: false,
    animate: true,
};

export default class SmSlider {

    private store: Store<SliderState>;
    private readonly $ref: Element;
    private readonly options: SliderOptions;
    private readonly $slides: Element;
    private readonly $arrowLeft: Nullable<Element>;
    private readonly $arrowRight: Nullable<Element>;
    private $navigation: Nullable<Element>;
    private $textNavigations: NodeList;

    constructor($ref: HTMLElement, options: SliderOptions) {
        this.$ref = $ref;
        this.options = {
            ...defaultOptions,
            ...options,
        };

        const $slides = this.$ref.querySelector('.slides');
        if (!$slides ||!$slides.children.length) {
            throw errors.NO_CHILDREN;
        }

        this.$slides = initSlides(
            $slides,
            this.options,
        );
        this.$arrowLeft = this.$ref.querySelector('.arrow-left');
        this.$arrowRight = this.$ref.querySelector('.arrow-right');
        this.$navigation = this.$ref.querySelector('.dot-nav');
        this.$textNavigations = this.$ref.querySelectorAll('.text-nav');

        clean(this.$slides);

        const isVertical = this.$ref.classList.contains('sm-slider--vertical');
        const innerSize = getInnerSize(
            this.$ref,
            this.$arrowLeft,
            this.$arrowRight,
            isVertical,
        );
        const {
            visibleSlides = 1,
            step = 1,
            offsetLeft,
        } = getBreakpointOptions(this.options, innerSize);

        if (offsetLeft < 0 || offsetLeft > 1) {
            throw errors.INVALID_OFFSET_LEFT;
        }

        const totalSlides = this.$slides.children.length;
        const isNextDisabled = totalSlides <= visibleSlides;
        const isPrevDisabled = !options.infinite || totalSlides <= visibleSlides;

        const initialState: SliderState = {
            ...defaultState,
            totalSlides,
            innerSize,
            visibleSlides,
            step,
            offsetLeft,
            isVertical,
            isPrevDisabled,
            isNextDisabled,
            isInfinite: !!options.infinite,
        };

        this.store = new Store<SliderState>(initialState, () => {});
    }
}
