import Store from "../utils/Store";
import slideTo from './slide-to';
import { SliderState } from '../types/SliderState';

export default (
    $textNavigations: NodeList,
    store: Store<SliderState>,
    $slides: HTMLElement,
): Array<HTMLElement> => {
    let $navigationElements: HTMLElement[] = [];

    if (!$textNavigations) {
        return $navigationElements;
    }

    Array.prototype.forEach.call(
        $textNavigations,
        ($textNavigation: HTMLElement, index: number) => {
            if (!$textNavigation.getAttribute('data-sm-slider-ref')) {
                $textNavigation.setAttribute(
                    'data-sm-slider-ref',
                    index.toString(),
                );
            }

            const hash = $textNavigation.getAttribute('data-sm-slider-ref');
            const $slide = $slides.querySelector(`[data-sm-slider-hash="${hash}"]`);

            if (!$slide) {
                return;
            }

            $textNavigation.addEventListener('click', () =>
                slideTo(
                    store,
                    parseInt(
                        $slide.getAttribute('data-sm-slider-index') || '0',
                        10,
                    )
                )
            );

            $navigationElements = $navigationElements.concat($textNavigation);
        },
    );

    if ($navigationElements[ 0 ]) {
        $navigationElements[ 0 ].classList.add('active');
    }

    return $navigationElements;
};

export const updateTextNavigation = (
    $textDots: Array<HTMLElement>,
    activeIndex: number,
    $slides: HTMLElement,
): void => {
    const $activeSlide: HTMLElement | null = $slides.querySelector(
        `[data-sm-slider-index="${activeIndex}"]`
    );

    if (!$activeSlide) {
        return;
    }

    $textDots.forEach(($textDot: HTMLElement) => {
        if ($textDot.getAttribute('data-sm-slider-ref') === $activeSlide.getAttribute('data-sm-slider-hash')) {
            $textDot.classList.add('active');
        } else {
            $textDot.classList.remove('active');
        }
    });
};
