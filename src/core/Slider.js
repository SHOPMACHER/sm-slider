export default class Slider {

    // DOM Elements
    $ref = null;
    $slides = null;
    $arrowLeft = null;
    $arrowRight = null;

    counter = 1;

    options = {};

    constructor($ref, options) {
        this.$ref = $ref;
        this.options = {
            ...this.options,
            ...options
        };

        this.$slides = $ref.querySelector('.slides');
        this.$arrowLeft = $ref.querySelector('.arrow-left');
        this.$arrowRight = $ref.querySelector('.arrow-right');

        this.attachEvents();
    }

    attachEvents() {
        if (this.$arrowRight) {
            this.$arrowRight.addEventListener('click', () => {
                this.$slides.style.transform = `translateX(${-100 * this.counter}%)`;
                this.counter++;
            });
        }
    }

}