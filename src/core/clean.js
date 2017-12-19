// @flow

/**
 * Cleans up duplicate slides and indexes other slides.
 */
export default ($slides: HTMLElement) => {
    for (let i = $slides.children.length - 1; i >= 0; i--) {
        if ($slides.children[i].hasAttribute('data-sm-slider-duplicate')) {
            $slides.removeChild($slides.children[i]);
        } else {
            $slides.children[i].setAttribute('data-sm-slider-index', i.toString());
        }
    }
};
