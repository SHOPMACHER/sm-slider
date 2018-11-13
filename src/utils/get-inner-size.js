// @flow
const getInnerWidth = (
    $slider: HTMLElement,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement
) => {
    const sliderWidth = $slider.querySelector('.slides-wrapper').getBoundingClientRect().width;
    // const arrowLeftWidth = $arrowLeft && !$arrowLeft.classList.contains('inset')
    //     ? $arrowLeft.getBoundingClientRect().width
    //     : 0;
    // const arrowRightWidth = $arrowRight && !$arrowRight.classList.contains('inset')
    //     ? $arrowRight.getBoundingClientRect().width
    //     : 0;

    return sliderWidth;
};

const getInnerHeight = (
    $slider: HTMLElement,
    $arrowTop: ?HTMLElement,
    $arrowBottom: ?HTMLElement
) => {
    const sliderHeight = $slider.querySelector('.slides-wrapper').getBoundingClientRect().height;
    // const arrowTopHeight = $arrowTop && !$arrowTop.classList.contains('inset')
    //     ? $arrowTop.getBoundingClientRect().height
    //     : 0;
    // const arrowBottomHeight = $arrowBottom && !$arrowBottom.classList.contains('inset')
    //     ? $arrowBottom.getBoundingClientRect().height
    //     : 0;

    return sliderHeight;
};

export default (
    $slider: HTMLElement,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement,
    isVertical: boolean = false
): number => {
    return isVertical
        ? getInnerHeight($slider, $arrowLeft, $arrowRight)
        : getInnerWidth($slider, $arrowLeft, $arrowRight);
}
