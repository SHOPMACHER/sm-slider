import Store from '../utils/Store';
import once from '../utils/event-listener-once';
import { SliderState } from '../types/SliderState';

function transitionEnd(
    store: Store<SliderState>,
    $slides: HTMLElement,
    currentSlide: number,
    totalSlides: number,
    targetSlide: number,
): void {
    $slides.classList.remove('animatable');

    if (currentSlide === totalSlides || currentSlide < 0) {
        store.setState(() => ({
            currentSlide: targetSlide,
            animate: false
        }));
    }
}

function getTransformPixels(
    currentSlide: number,
    step: number,
    visibleSlides: number,
    totalSlides: number,
    offset: number,
    innerSize: number,
    isInfinite: boolean,
): number {
    if (totalSlides <= visibleSlides) {
        return 0;
    }

    const slideSize = innerSize / visibleSlides;
    const indentOffset = offset * slideSize;
    const stepOffset = isInfinite ? slideSize * step : 0;
    const currentSlideOffset = slideSize * currentSlide;

    return -(currentSlideOffset + stepOffset) + indentOffset;
}

export default (
    $ref: HTMLElement,
    $slides: HTMLElement,
    store: Store<SliderState>,
    preventAnimation: boolean = false,
): void => {
    const {
        currentSlide,
        innerSize,
        totalSlides,
        animate,
        visibleSlides,
        offsetLeft,
        step,
        isVertical,
        isInfinite
    } = store.getState();

    let targetSlide = currentSlide;
    if (currentSlide === totalSlides) {
        targetSlide = 0;
    } else if (currentSlide < 0) {
        targetSlide = totalSlides - step;
    }

    if (animate && !preventAnimation) {
        $slides.classList.add('animatable');
        once(
            $slides,
            'transitionend',
            transitionEnd.bind(
                undefined,
                store,
                $slides,
                currentSlide,
                totalSlides,
                targetSlide
            )
        );

        $ref.dispatchEvent(new CustomEvent('slide', {
            detail: {
                to: targetSlide,
                internal: true
            }
        }));
    }

    const translateProp = isVertical ? 'translateY' : 'translateX';
    const translateValue = getTransformPixels(currentSlide, step, visibleSlides, totalSlides, offsetLeft, innerSize, isInfinite);

    $slides.style.transform = `${translateProp}(${translateValue}px)`;
};
