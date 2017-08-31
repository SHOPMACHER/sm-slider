// @flow
import debounce from 'lodash.debounce';

import Store from './utils/Store';
import * as errors from './utils/errors';
import slide from './core/slide';

import type { SliderState } from './types/SliderState';
import type { SliderOptions } from './types/SliderOptions';
import resizeHandler from './events/resize-handler';
import resize from './core/resize';
import previous from './core/previous';
import next from './core/next';
import getInnerWidth from './utils/get-inner-width';

export default class Slider {

    // Slider options
    options: SliderOptions = {
        infinite: false,
        visibleSlides: 1,
        step: 1
    };

    // DOM Elements
    $ref: HTMLElement;
    $slides: ?HTMLElement;
    $arrowLeft: ?HTMLElement;
    $arrowRight: ?HTMLElement;

    // Internal state
    initialState: SliderState = {
        currentSlide: 0,
        innerWidth: 0,
        totalSlides: 0,
        isNextDisabled: false,
        isPrevDisabled: false
    };

    store: Store<SliderState>;

    constructor($ref: HTMLElement, options: SliderOptions) {
        this.$ref = $ref;
        this.options = {
            ...this.options,
            ...options
        };

        this.$slides = $ref.querySelector('.slides');
        if (!this.$slides) {
            throw errors.NO_SLIDE_CONTAINER;
        }

        if (!this.$slides.children.length) {
            throw errors.NO_CHILDREN;
        }

        this.$arrowLeft = $ref.querySelector('.arrow-left');
        this.$arrowRight = $ref.querySelector('.arrow-right');

        const initialState = {
            ...this.initialState,
            innerWidth: getInnerWidth(this.$ref, this.$arrowLeft, this.$arrowRight),
            totalSlides: this.$slides.children.length
        };

        this.store = new Store(initialState, this.handleChange);

        resize(this.$slides, this.store, this.options);

        if (this.$arrowLeft) {
            this.$arrowLeft.addEventListener('click', previous.bind(this, this.$slides, this.store, this.options));
        }

        if (this.$arrowRight) {
            this.$arrowRight.addEventListener('click', next.bind(this, this.$slides, this.store, this.options));
        }

        window.addEventListener('resize', debounce(
            resizeHandler.bind(this, this.$ref, this.store, this.$arrowLeft, this.$arrowRight),
            200
        ));
    }

    handleChange = (prevState: SliderState) => {
        console.log('update', this.store.getState());

        const {
            currentSlide,
            innerWidth,
            isPrevDisabled,
            isNextDisabled
        } = this.store.getState();

        const { infinite } = this.options;

        if (innerWidth !== prevState.innerWidth) {
            resize(this.$slides, this.store, this.options);
        }

        if (!infinite) {
            if (isPrevDisabled) {
                this.$arrowLeft.classList.add('disabled');
            } else {
                this.$arrowLeft.classList.remove('disabled');
            }

            if (isNextDisabled) {
                this.$arrowRight.classList.add('disabled');
            } else {
                this.$arrowRight.classList.remove('disabled');
            }
        }

        if (currentSlide !== prevState.currentSlide || infinite) {
            slide(this.$slides, this.store, this.options);
        }
    };
}
