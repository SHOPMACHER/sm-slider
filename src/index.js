// @flow
import Slider from './Slider';
import 'custom-event-polyfill';

import './styles/main.less';

/**
 * Hot module replacement script for development.
 */
if (process.env.NODE_ENV === 'development' && module.hot) {
    console.clear();
    module.hot.accept();
}

export default Slider;
