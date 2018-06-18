// @flow
import type {SliderState} from "../types/SliderState";
import Store from "../utils/Store";
import slideTo from './slide-to';

export default (
    $textNavigations: NodeList<HTMLElement>,
    store: Store<SliderState>,
    $slides:HTMLElement
): Array<HTMLElement> => {
    let $navigationElements = [];

    if (!$textNavigations) {
        return $navigationElements;
    }

    Array.prototype.forEach.call($textNavigations, ($textNavigation:HTMLElement, index:number) => {
        if (!$textNavigation.getAttribute('data-sm-slider-ref')) {
            $textNavigation.setAttribute('data-sm-slider-ref', index);
        }

        const hash = $textNavigation.getAttribute('data-sm-slider-ref');
        const $slide = $slides.querySelector(`[data-sm-slider-hash="${hash}"]`);

        if (!$slide) {
            return;
        }

        $textNavigation.addEventListener('click', () => slideTo(store, parseInt($slide.getAttribute('data-sm-slider-index'))));
        $navigationElements = $navigationElements.concat($textNavigation);
    });

    if ($navigationElements[0]) {
        $navigationElements[0].classList.add('active');
    }

    return $navigationElements;
};

export const updateTextNavigation = (
    $textDots: Array<HTMLElement>,
    activeIndex: number,
    $slides:HTMLElement
) => {
    const $activeSlide:HTMLElement = $slides.querySelector(`[data-sm-slider-index="${activeIndex}"]`);

    if (!$activeSlide) {
        return;
    }

    $textDots.forEach(($textDot:HTMLElement) => {
        if ($textDot.getAttribute('data-sm-slider-ref') === $activeSlide.getAttribute('data-sm-slider-hash')) {
            $textDot.classList.add('active');
        } else {
            $textDot.classList.remove('active');
        }
    });
};
