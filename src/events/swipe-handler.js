// @flow
import Store from '../utils/Store';
import type { SwipeDirection } from '../types/SwipeDirection';
import type { SliderState } from '../types/SliderState';
import type { SliderOptions } from '../types/SliderOptions';

import slideTo from '../core/slide-to';

/**
 * touch events for swipe elements
 * @param $touchTarget
 * @param options
 * @param store
 * @param options
 * @param handleSwipe
 */
export default (
    $touchTarget: HTMLElement,
    store: Store<SliderState>,
    options: SliderOptions,
    handleSwipe: (swipeDirection: SwipeDirection) => void
) => {
    let swipeDirection: SwipeDirection;
    let startX: number;
    let startY: number;
    let distX: number;
    let distY: number;
    let translate: number;
    let threshold = 50; //required min distance traveled to be considered swipe
    const restraint = 100; // maximum distance allowed at the same time in perpendicular direction
    let _slideTo = 0;
    let clientY = 0;

    if (!store.getState().isVertical) {
        $touchTarget.addEventListener('touchstart', (event: TouchEvent) => {
            const touch = event.changedTouches[0];

            swipeDirection = 'none';
            threshold = (store.getState().innerSize / options.visibleSlides) / 5;
            startX = touch.pageX;
            startY = touch.pageY;

            const translateMatch = $touchTarget.style.transform.match(/-?\d+/i);
            if (translateMatch && translateMatch[0]) {
                $touchTarget.classList.remove('animatable');
                translate = parseInt(translateMatch[0], 10);
            }

        }, { passive: true });

        $touchTarget.addEventListener('touchmove', (event: TouchEvent) => {
            const touch = event.changedTouches[0];

            distX = touch.pageX - startX;
            distY = touch.pageY - startY;
            setTimeout(() => {
                clientY = touch.clientY;
            }, 10);

            if (translate !== null && translate !== undefined) {
                $touchTarget.style.transform = `translateX(${translate + distX}px)`;
            }

            touch.clientY < clientY ?  window.scrollTo(0, pageYOffset + 1) :  window.scrollTo(0, pageYOffset - 1);

        }, { passive: true });

        $touchTarget.addEventListener('touchend', (event: TouchEvent) => {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipeDirection = (distX < 0) ? 'left' : 'right';
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipeDirection = (distY < 0) ? 'up' : 'down';
            } else {
                $touchTarget.classList.add('animatable');
                $touchTarget.style.transform = `translateX(${translate}px)`;
            }


            const slideWidth = window.getComputedStyle($touchTarget.children[0]).width.split('px')[0];
            _slideTo = Math.abs(Math.round((translate + distX) / slideWidth));

            if (options.infinite) {
                _slideTo = Math.abs(Math.round((translate + distX) / slideWidth)) - 1;
            }

            window.setTimeout(() => {
                if (options.step > 1 && options.infinite) {
                    _slideTo = _slideTo - options.step + 1;
                } else if (!options.infinite && _slideTo >= store.getState().totalSlides - store.getState().visibleSlides) {
                    _slideTo = store.getState().totalSlides - store.getState().visibleSlides;
                    requestAnimationFrame(() => slideTo(store, _slideTo +2));
                }

                requestAnimationFrame(() => slideTo(store, _slideTo));
            }, 20);

            distX = 0;
            distY = 0;

            handleSwipe(swipeDirection);
        }, { passive: true });
    }
};