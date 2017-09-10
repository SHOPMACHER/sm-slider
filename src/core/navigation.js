// @flow
import Store from '../utils/Store';
import type { SliderState } from '../types/SliderState';

export default ($navigation: HTMLElement, store: Store<SliderState>): Array<HTMLElement> => {
    const { totalSlides, step } = store.getState();
    const dots = Math.ceil(totalSlides / step);

    const $dots = [];

    for (let i = 0; i < dots; i++) {
        const $dot = document.createElement('div');
        $dot.classList.add('dot');
        $dots.push($dot);
        $navigation.appendChild($dot);
    }

    $dots[0].classList.add('active');

    return $dots;
};

export const updateNavigation = ($dots: Array<HTMLElement>, activeIndex: number) => {
    $dots.forEach(($dot, index) => {
        if (index === activeIndex) {
            $dot.classList.add('active');
        } else {
            $dot.classList.remove('active');
        }
    });
};
