import Store from '../utils/Store';
import * as errors from '../utils/errors';

import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

export default class Slider {

    // Slider options
    options = {};

    // DOM Elements
    $ref = null;
    $slides = null;
    $arrowLeft = null;
    $arrowRight = null;

    // Internal state
    initialState: SliderState = {
        currentSlide: 0
    };

    store: Store = null;

    constructor($ref: HTMLElement, options: SliderOptions) {
        this.$ref = $ref;
        this.options = {
            ...this.options,
            ...options
        };

        this.$slides = $ref.querySelector('.slides');
        if (!this.$slides.children.length) {
            throw errors.NO_CHILDREN;
        }

        this.$arrowLeft = $ref.querySelector('.arrow-left');
        if (this.$arrowLeft) {
            this.$arrowLeft.addEventListener('click', this.handleSlidePrev);
        }

        this.$arrowRight = $ref.querySelector('.arrow-right');

        if (this.$arrowRight) {
            this.$arrowRight.addEventListener('click', this.handleSlideNext);
        }

        const initialState = {
            ...this.initialState,
            slideWidth: this.getInnerWidth()
        };

        this.store = new Store(initialState);
        this.store.listen(this.handleChange);

        window.addEventListener('resize', () => {
            this.store.setState({
                slideWidth: this.getInnerWidth()
            });
        });
    }

    getInnerWidth() {
        const sliderWidth = this.$ref.getBoundingClientRect().width;
        const arrowOffset = this.$arrowLeft.getBoundingClientRect().width + this.$arrowRight.getBoundingClientRect().width;

        return sliderWidth - arrowOffset;
    }

    handleSlideNext = () => {
        this.store.setState(prevState => ({
            currentSlide: ++prevState.currentSlide
        }));
    };

    handleSlidePrev = () => {
        this.store.setState(prevState => ({
            currentSlide: --prevState.currentSlide
        }));
    };

    handleChange = (prevState: SliderState) => {
        const { currentSlide, slideWidth } = this.store.getState();

        console.log('width', slideWidth);

        Array.prototype.forEach.call(this.$slides.children, ($slide) => {
            $slide.style.width = `${slideWidth}px`;
        });

        if (currentSlide !== prevState.currentSlide) {
            this.$slides.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
        }
    };

}
