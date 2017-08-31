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

        const $slides = this.$slides = $ref.querySelector('.slides');
        this.$arrowLeft = $ref.querySelector('.arrow-left');
        this.$arrowRight = $ref.querySelector('.arrow-right');

        if (!$slides || !$slides.children.length) {
            throw errors.NO_CHILDREN;
        }

        const initialState = {
            ...this.initialState,
            innerWidth: getInnerWidth(this.$ref, this.$arrowLeft, this.$arrowRight),
            totalSlides: $slides.children.length
        };

        this.setupSlides();

        this.store = new Store(initialState, this.handleChange);

        resize($slides, this.store, this.options);

        if (this.$arrowLeft) {
            this.$arrowLeft.addEventListener('click', previous.bind(this, $slides, this.store, this.options));
        }

        if (this.$arrowRight) {
            this.$arrowRight.addEventListener('click', next.bind(this, $slides, this.store, this.options));
        }

        window.addEventListener('resize', debounce(
            resizeHandler.bind(this, this.$ref, this.store, this.$arrowLeft, this.$arrowRight),
            200
        ));
    }

    setupSlides() {
        const $prevSlides: Array<HTMLElement> = [];
        const $nextSlides: Array<HTMLElement> = [];

        const lastSlideIndex = this.$slides.children.length - 1;

        for (let i = 0, j = lastSlideIndex; i < this.options.visibleSlides; i++, j--) {
            $prevSlides.push(this.$slides.children[j].cloneNode(true));
            $nextSlides.push(this.$slides.children[i].cloneNode(true));
        }

        Array.prototype.forEach.call(this.$slides.children, ($slide, index) => {
            $slide.setAttribute('data-sm-slider-index', index);
        });

        Array.prototype.forEach.call($prevSlides, ($slide, index) => {
            $slide.setAttribute('data-sm-slider-index', lastSlideIndex - index);
            this.$slides.insertBefore($slide, this.$slides.firstElementChild);
        });

        Array.prototype.forEach.call($nextSlides, ($slide, index) => {
            $slide.setAttribute('data-sm-slider-index', index);
            this.$slides.appendChild($slide);
        });
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
