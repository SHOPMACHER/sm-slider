// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';
import getInnerWidth from '../utils/get-inner-width';

export default (
    $slider: HTMLElement,
    store: Store<SliderState>,
    $arrowLeft: ?HTMLElement,
    $arrowRight: ?HTMLElement
) => {
    console.log($slider);

    store.setState(prevState => ({
        innerWidth: getInnerWidth($slider, $arrowLeft, $arrowRight)
    }));
}
