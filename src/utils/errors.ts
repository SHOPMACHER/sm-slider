const PREFIX = '[smSlider]';

/**
 * Creates an instance of an error. When no error type is provided, the type `Error` is chosen.
 *
 * @param message Error message
 * @param T Error class
 */
const createErrorMessage = (
    message: string,
    T = Error
) => new T(`${PREFIX} ${message}`);

export const INVALID_OPTIONS = createErrorMessage(
    'Slider could not be initialized with the provided options. Please check that you provided valid JSON.'
);

export const NO_CHILDREN = createErrorMessage(
    'Slider needs to contain children to be initialized.'
);

export const INVALID_OFFSET_LEFT = createErrorMessage(
    'The property `offsetLeft` has an invalid value. Please only provide values >= 0 and <= 1.'
);
