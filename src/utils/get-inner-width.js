// @flow
export default (
    $slider: HTMLElement,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement
): number => {
    const sliderWidth = $slider.getBoundingClientRect().width;
    const arrowLeftWidth = $arrowLeft ? $arrowLeft.getBoundingClientRect().width : 0;
    const arrowRightWidth = $arrowRight ? $arrowRight.getBoundingClientRect().width : 0;

    return sliderWidth - arrowLeftWidth - arrowRightWidth;
};
