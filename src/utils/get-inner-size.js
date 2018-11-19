// @flow
const getInnerWidth = (
    $slider: HTMLElement
) => {
    return $slider.querySelector('.slides-wrapper').getBoundingClientRect().width;
};

const getInnerHeight = (
    $slider: HTMLElement
) => {
    return $slider.querySelector('.slides-wrapper').getBoundingClientRect().height;
};

export default (
    $slider: HTMLElement,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement,
    isVertical: boolean = false
): number => {
    return isVertical
        ? getInnerHeight($slider)
        : getInnerWidth($slider);
}
