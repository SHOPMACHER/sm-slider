import Slider from '../src/Slider';
import {
    total4Visible2,
    total4Visible4
} from '../__mocks__/dom';

describe('Total 4, Visible 2', () => {

    let document = null;
    let slider = null;

    beforeAll(() => {
        document = total4Visible2();
        const $root = document.querySelector('.sm-slider');
        const $options = JSON.parse($root.getAttribute('data-sm-slider'));
        slider = new Slider($root, $options);
    });

    test('arrows are visible', () => {
        const $arrowLeft = document.querySelector('.arrow-left');
        const arrowLeftVisibility = $arrowLeft.style.visibility;
        const $arrowRight = document.querySelector('.arrow-right');
        const arrowRightVisibility = $arrowRight.style.visibility;

        expect($arrowLeft).toBeDefined();
        expect(arrowLeftVisibility === "" || arrowLeftVisibility === "visible").toBeTruthy();
        expect($arrowRight).toBeDefined();
        expect(arrowRightVisibility === "" || arrowRightVisibility === "visible").toBeTruthy();
    });
});

describe('Total 4, Visible 4', () => {

    let document = null;
    let slider = null;

    beforeAll(() => {
        document = total4Visible4();
        const $root = document.querySelector('.sm-slider');
        const $options = JSON.parse($root.getAttribute('data-sm-slider'));
        slider = new Slider($root, $options);
    });

    test('arrows are hidden', () => {
        const $arrowLeft = document.querySelector('.arrow-left');
        const arrowLeftVisibility = $arrowLeft.style.visibility;
        const $arrowRight = document.querySelector('.arrow-right');
        const arrowRightVisibility = $arrowRight.style.visibility;

        expect($arrowLeft).toBeDefined();
        expect(arrowLeftVisibility === "hidden").toBeTruthy();
        expect($arrowRight).toBeDefined();
        expect(arrowRightVisibility === "hidden").toBeTruthy();
    });
});
