import { SliderOptions } from '../types/SliderOptions';

/**
 * Remove empty slides im "showEmptySlides" is true
 */
export default (
    $slides: Element,
    options: SliderOptions
): Element => {
    if (options.showEmptySlides) {
        return $slides;
    }

    const $children: NodeList = $slides.querySelectorAll('.slide');

    Array.prototype.forEach.call($children, ($slide: HTMLElement) => {
        if ($slide.innerHTML === '') {
            $slides.removeChild($slide);
        }
    });

    return $slides;
};
