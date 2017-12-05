// @flow

/**
 * Triggers event listener once - fix for IE till version 11 and iOS till version 10
 *
 * @param $element
 * @param type
 * @param func
 */
export default(
    $element: HTMLElement,
    type: string,
    func: () => void
) => {
    const handler = (event: Event) => {
        $element.removeEventListener(type, handler);
        func(event);
    };

    $element.addEventListener(type, handler);
}