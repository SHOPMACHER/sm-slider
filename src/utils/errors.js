// @flow
const PREFIX = '[smSlider]';

/**
 * Creates an instance of an error. When no error type is provided, the type `Error` is chosen.
 *
 * @param message Error message
 * @param T Error class
 */
const createErrorMessage = (message, T = Error) => new T(`${PREFIX} ${message}`);

export const NO_CHILDREN = createErrorMessage(
    'Slider needs to contain children to be initialized.'
);
