import Store from '../utils/Store';

import clearChildren from '../utils/clear-children';
import slideTo from './slide-to';
import { SliderState } from '../types/SliderState';

export default (
    $navigation: HTMLElement,
    store: Store<SliderState>,
): HTMLElement[] | null => {
    const { totalSlides, step } = store.getState();

    if (!clearChildren($navigation)) {
        return null;
    }

    const dots = Math.ceil(totalSlides / step);
    const $dots = [];

    for (let i = 0; i < dots; i++) {
        const $dot = document.createElement('div');
        $dot.classList.add('dot');
        $dot.addEventListener('click', () => slideTo(store, i));
        $dots.push($dot);
        $navigation.appendChild($dot);
    }

    $dots[0].classList.add('active');

    return $dots;
};

export const updateNavigation = (
    $dots: Array<HTMLElement>,
    activeIndex: number,
    store: Store<SliderState>
): void => {
    const { step } = store.getState();
    const activePageIndex = Math.floor(activeIndex / step);

    $dots.forEach(($dot, index) => {
        if (index === activePageIndex) {
            $dot.classList.add('active');
        } else {
            $dot.classList.remove('active');
        }
    });
};
