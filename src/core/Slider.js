import Store from '../utils/Store';

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
        this.$arrowLeft = $ref.querySelector('.arrow-left');
        this.$arrowRight = $ref.querySelector('.arrow-right');

        const initialState = {
            ...this.initialState,
            slideWidth: this.$slides.children[0].getBoundingClientRect().width
        };

        this.store = new Store(initialState);
        this.store.listen(this.handleChange);

        this.attachEvents();
    }

    attachEvents() {
        if (this.$arrowRight) {
            this.$arrowRight.addEventListener('click', () => {
                this.store.setState(prevState => ({
                    currentSlide: ++prevState.currentSlide
                }));
            });
        }

        if (this.$arrowLeft) {
            this.$arrowLeft.addEventListener('click', () => {
                this.store.setState(prevState => ({
                    currentSlide: --prevState.currentSlide
                }));
            });
        }
    }

    handleChange = () => {
        const { currentSlide, slideWidth } = this.store.getState();

        this.$slides.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    };

}
