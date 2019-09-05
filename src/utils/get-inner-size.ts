import { Nullable } from '../types/Nullable';

const getInnerWidth = (
    $slider: Element,
    $arrowLeft: Nullable<Element>,
    $arrowRight: Nullable<Element>,
) => {
    const sliderWidth = $slider.getBoundingClientRect().width;
    const arrowLeftWidth = $arrowLeft && !$arrowLeft.classList.contains('inset')
        ? $arrowLeft.getBoundingClientRect().width
        : 0;
    const arrowRightWidth = $arrowRight && !$arrowRight.classList.contains('inset')
        ? $arrowRight.getBoundingClientRect().width
        : 0;

    return sliderWidth - arrowLeftWidth - arrowRightWidth;
};

const getInnerHeight = (
    $slider: Element,
    $arrowTop: Nullable<Element>,
    $arrowBottom: Nullable<Element>,
) => {
    const sliderHeight = $slider.getBoundingClientRect().height;
    const arrowTopHeight = $arrowTop && !$arrowTop.classList.contains('inset')
        ? $arrowTop.getBoundingClientRect().height
        : 0;
    const arrowBottomHeight = $arrowBottom && !$arrowBottom.classList.contains('inset')
        ? $arrowBottom.getBoundingClientRect().height
        : 0;

    return sliderHeight - arrowTopHeight - arrowBottomHeight;
};

export default (
    $slider: Element,
    $arrowLeft: Nullable<Element>,
    $arrowRight: Nullable<Element>,
    isVertical: boolean = false,
): number => {
    return isVertical
        ? getInnerHeight($slider, $arrowLeft, $arrowRight)
        : getInnerWidth($slider, $arrowLeft, $arrowRight);
}
