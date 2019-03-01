// @flow
import debounce from 'lodash.debounce';

import Store from './utils/Store';
import Private from './utils/Private';
import * as errors from './utils/errors';
import slide from './core/slide';

import type { SliderState } from './types/SliderState';
import type { SliderOptions } from './types/SliderOptions';
import type { SwipeDirection } from './types/SwipeDirection';
import resizeHandler from './events/resize-handler';
import resize from './core/resize';
import previous from './core/previous';
import next from './core/next';
import slideTo from './core/slide-to';
import getInnerSize from './utils/get-inner-size';
import handleSwipe from './events/swipe-handler';
import clean from './core/clean';
import configure from './core/configure';
import createNavigation, { updateNavigation } from './core/navigation';
import createTextNavigation, { updateTextNavigation } from './core/textNavigation';
import initSlides from './core/initSlides';
import getBreakpointOptions from './utils/get-breakpoint-options';

const _ = new Private();

const _defaultOptions: SliderOptions = {
    infinite: false,
    visibleSlides: 1,
    step: 1,
    offsetLeft: 0,
    autoplay: 0,
    showEmptySlides: true,
    disabledSwipe: false,
};

const _initialState: SliderState = {
    currentSlide: 0,
    innerSize: 0,
    totalSlides: 0,
    step: 1,
    visibleSlides: 1,
    offsetLeft: 0,
    isNextDisabled: false,
    isPrevDisabled: false,
    isVertical: false,
    isInfinite: false
};

/**
 * This is the main class that is used to instantiate a new slider.
 * To create a new slider, use the constructor function like
 * `new Slider($ref: HTMLElement, options: SliderOptions)`.
 */
export default class Slider {

    store: Store<SliderState>;

    /**
     * Constructor
     *
     * Creates a new instance of the slider class
     *
     * @param $ref {HTMLElement} Element that contains the slides
     * @param options {SliderOptions} Optional configuration
     */
    constructor($ref: HTMLElement, options: SliderOptions) {
        _(this).$ref = $ref;
        _(this).options = {
            ..._defaultOptions,
            ...options
        };
        _(this).$slides = initSlides(_(this).$ref.querySelector('.slides'), _(this).options);
        _(this).$arrowLeft = _(this).$ref.querySelector('.arrow-left');
        _(this).$arrowRight = _(this).$ref.querySelector('.arrow-right');
        _(this).$navigation = _(this).$ref.querySelector('.dot-nav');
        _(this).$textNavigations = _(this).$ref.querySelectorAll('.text-nav');

        if (!_(this).$slides || !_(this).$slides.children.length) {
            throw errors.NO_CHILDREN;
        }

        clean(_(this).$slides);

        const isVertical = _(this).$ref.classList.contains('sm-slider--vertical');
        const innerSize = getInnerSize(_(this).$ref, _(this).$arrowLeft, _(this).$arrowRight, isVertical);
        const { visibleSlides, step, offsetLeft } = getBreakpointOptions(_(this).options, window.innerWidth);

        if (offsetLeft < 0 || offsetLeft > 1) {
            throw errors.INVALID_OFFSET_LEFT;
        }

        const totalSlides = _(this).$slides.children.length;
        const isNextDisabled = totalSlides <= visibleSlides;
        const isPrevDisabled = !options.infinite || totalSlides <= visibleSlides;

        const initialState = {
            ..._initialState,
            totalSlides,
            innerSize,
            visibleSlides,
            step,
            offsetLeft,
            isVertical,
            isPrevDisabled,
            isNextDisabled,
            isInfinite: options.infinite
        };

        // Create the store holding the internal state and setup the slider
        _(this).store = new Store(initialState, this.handleChange);
        configure(_(this).$slides, _(this).options, _(this).store);
        resize(_(this).$ref, _(this).$slides, _(this).store);

        // Initialize the dot navigation
        _(this).$navigationDots = createNavigation(_(this).$navigation, _(this).store);

        // Initialize the text navigation
        _(this).$textDots = createTextNavigation(_(this).$textNavigations,_(this).store, _(this).$slides);

        // If the left arrow exists, attach the `previous` event to it
        if (_(this).$arrowLeft) {
            _(this).$arrowLeft.addEventListener('click', previous.bind(this, _(this).$ref, _(this).$slides, _(this).store, _(this).options, false));
            _(this).$arrowLeft.style.visibility = isPrevDisabled ? 'hidden' : 'visible';
        }

        // If the right arrow exists, attach the `next` event to it.
        if (_(this).$arrowRight) {
            _(this).$arrowRight.addEventListener('click', next.bind(this, _(this).$ref, _(this).$slides, _(this).store, _(this).options, false));
            _(this).$arrowRight.style.visibility = isNextDisabled ? 'hidden' : 'visible';
        }

        // Resize the slider, whenever the window resizes (i.e. resize, orientation change)
        window.addEventListener('resize', debounce(
            resizeHandler.bind(this, _(this).$ref, _(this).store, _(this).options, _(this).$arrowLeft, _(this).$arrowRight),
            200
        ));

        // Swipe to a different slide, based on the direction the user swipes in
        if (!isNextDisabled && !_(this).options.disabledSwipe) {
            handleSwipe(_(this).$slides, _(this).store, _(this).options, (direction: SwipeDirection) => {
                switch (direction) {
                    case 'left':
                        next(_(this).$ref, _(this).$slides, _(this).store, _(this).options, false);
                        break;
                    case 'right':
                        previous(_(this).$ref, _(this).$slides, _(this).store, _(this).options, false);
                        break;
                    default:
                        slideTo(_(this).store, _(this).store.getState().currentSlide);
                        break;
                }
            });
        }

        // Listen for `slide` events, triggered from external scripts
        _(this).$ref.addEventListener('slide', (event: CustomEvent) => {
            const { internal, to } = event.detail;
            return internal ? null : this.toSlide(to);
        });

        // Listen for `next` events, triggered from external scripts
        _(this).$ref.addEventListener('next', (event: CustomEvent) => {
            return event.detail && event.detail.internal ? null : this.nextSlide(true);
        });

        // Listen for `previous` events, triggered from external scripts
        _(this).$ref.addEventListener('previous', (event: CustomEvent) => {
            return event.detail && event.detail.internal ? null : this.previousSlide(true);
        });

        if (_(this).options.autoplay) {
            _(this).isIntervalPaused = false;

            setInterval(() => !_(this).isIntervalPaused && this.nextSlide(), _(this).options.autoplay);

            _(this).$ref.addEventListener('mouseenter', () => {
                _(this).isIntervalPaused = true;
            });

            _(this).$ref.addEventListener('mouseleave', () => {
                _(this).isIntervalPaused = false;
            });
        }

        _(this).$ref.classList.remove('cloaked');
    }

    /**
     * Slides to the next slides.
     *
     * @public
     */
    nextSlide = (isEventTrigger: boolean = false) => {
        next(_(this).$ref, _(this).$slides, _(this).store, _(this).options, isEventTrigger);
    };

    /**
     * Slides to the previous slide.
     *
     * @public
     */
    previousSlide = (isEventTrigger: boolean = false) => {
        previous(_(this).$ref, _(this).$slides, _(this).store, _(this).options, isEventTrigger);
    };

    /**
     * Slides to a specific slide referenced by the index of the slide.
     *
     * @public
     * @param slide Slide index
     */
    toSlide = (slide: number) => {
        slideTo(_(this).store, slide);
    };

    /**
     * Override of `addEventListener` to make sure, events attached by the user are attached to `$ref`.
     *
     * @param event Eventname
     * @param handler Eventhandler
     * @param options Eventoptions
     */
    addEventListener = (event: string, handler: (event: CustomEvent) => any, options: any) => {
        _(this).$ref.addEventListener(event, handler, options);
    };

    /**
     * Override of `removeEventListener` to make sure, added events are detached the right way.
     *
     * @param event Eventname
     * @param handler Eventhandler
     */
    removeEventListener = (event: string, handler: (event: CustomEvent) => any) => {
        _(this).$ref.removeEventListener(event, handler);
    };

    /**
     * Handles updates of the data store to make the UI reflect the internal state at all times.
     *
     * @private
     * @param prevState State before the update
     */
    handleChange = (prevState: SliderState) => {
        const {
            $slides,
            store,
            options
        } = _(this);

        const {
            currentSlide,
            innerSize,
            visibleSlides,
            step,
            isNextDisabled,
            isPrevDisabled
        } = store.getState();

        // Resize the slider, if the innerSize has changed
        if (innerSize !== prevState.innerSize) {
            resize(_(this).$ref, $slides, store);
        }

        // Reconfigure slider, if visibleSlides or step changes due to breakpoint hit
        if (visibleSlides !== prevState.visibleSlides || step !== prevState.step) {
            clean($slides);
            configure($slides, options, store);
            _(this).$navigationDots = createNavigation(_(this).$navigation, _(this).store);
        }

        if (_(this).$arrowLeft && isPrevDisabled !== prevState.isPrevDisabled) {
            _(this).$arrowLeft.style.visibility = isPrevDisabled ? 'hidden' : 'visible';
        }

        if (_(this).$arrowRight && isNextDisabled !== prevState.isNextDisabled) {
            _(this).$arrowRight.style.visibility = isNextDisabled ? 'hidden' : 'visible';
        }

        // Trigger the sliding animation, if the slide has changed
        if (currentSlide !== prevState.currentSlide || options.infinite) {
            slide(_(this).$ref, $slides, store);
            if (_(this).$navigationDots) {
                updateNavigation(_(this).$navigationDots, currentSlide, _(this).store);
            }

            if (_(this).$textDots) {
                updateTextNavigation(_(this).$textDots, currentSlide, _(this).$slides);
            }
        }
    };

    /**
     * Instantiates all sliders.
     *
     * @public
     * @static
     * @returns {Array.<Slider>} Array of initialized sliders
     */
    static init() {
        const $sliders:NodeList<HTMLElement> = document.querySelectorAll('[data-sm-slider]');
        let $refs:Array<Slider> = [];

        Array.prototype.forEach.call($sliders, ($slider: HTMLElement) => {
            const optionString: ?string = $slider.getAttribute('data-sm-slider');
            if (!optionString) {
                return;
            }

            let options: SliderOptions;

            try {
                options = JSON.parse(optionString);
            } catch(err) {
                throw errors.INVALID_OPTIONS
            }

            $refs.push(new Slider($slider, options));
        });

        return $refs;
    }
}
