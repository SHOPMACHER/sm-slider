import Slider from '../src/Slider';
import {
    total4Visible2,
    total4Visible4,
    total4Visible1WithBreakpoint
} from '../__mocks__/dom';

describe('Initialization', () => {

    test('init with 4 total and 2 visible', () => {
        const document = total4Visible2();
        const $root = document.querySelector('.sm-slider');
        const options = JSON.parse($root.getAttribute('data-sm-slider'));

        expect(new Slider($root, options)).toBeInstanceOf(Slider);
    });

    test('init with 4 total and 2 visible', () => {
        const document = total4Visible4();
        const $root = document.querySelector('.sm-slider');
        const options = JSON.parse($root.getAttribute('data-sm-slider'));

        expect(new Slider($root, options)).toBeInstanceOf(Slider);
    });

    test('init with 4 total and 1 visible, with breakpoint', () => {
        const document = total4Visible1WithBreakpoint();
        const $root = document.querySelector('.sm-slider');
        const options = JSON.parse($root.getAttribute('data-sm-slider'));

        expect(new Slider($root, options)).toBeInstanceOf(Slider);
    });
});
