// @flow
import { JSDOM } from 'jsdom';

const html = (content: string) => new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        ${content} 
    </body>
    </html>
`);

/**
 * Slider
 *
 * Total: 4
 * Visible: 2
 *
 * @return {HTMLDocument}
 */
export const total4Visible2 = () => {
    const { window } = html(`
        <div 
            class="sm-slider cloaked"
            data-sm-slider='{ "visibleSlides": 2, "step": 1, "infinite": true }'>
            <div class="arrow-left inset">L</div>
            <div class="slides-wrapper">
                <div class="slides">
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%201"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%202"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%203"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%204"
                            alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="arrow-right inset">R</div>
        </div>
    `);

    return window.document;
};

/**
 * Slider
 *
 * Total: 4
 * Visible: 4
 *
 * @return {HTMLDocument}
 */
export const total4Visible4 = () => {
    const { window } = html(`
        <div 
            class="sm-slider cloaked"
            data-sm-slider='{ "visibleSlides": 4, "step": 1, "infinite": true }'>
            <div class="arrow-left inset">L</div>
            <div class="slides-wrapper">
                <div class="slides">
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%201"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%202"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%203"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%204"
                            alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="arrow-right inset">R</div>
        </div>
    `);

    return window.document;
};

/**
 * Slider
 *
 * Total: 4
 * Visible: 4
 *
 * @return {HTMLDocument}
 */
export const total4Visible1WithBreakpoint = () => {
    const { window } = html(`
        <div 
            class="sm-slider cloaked"
            data-sm-slider='{ "visibleSlides": 1, "step": 1, "infinite": true, "breakpoints": { "768": { "visibleSlides": 4 } } }'>
            <div class="arrow-left inset">L</div>
            <div class="slides-wrapper">
                <div class="slides">
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%201"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%202"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%203"
                            alt="">
                        </div>
                    </div>
                    <div class="slide">
                        <div 
                            class="product"><img
                            src="http://via.placeholder.com/400x400?text=Slide%204"
                            alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="arrow-right inset">R</div>
        </div>
    `);

    return window.document;
};
