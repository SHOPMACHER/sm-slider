/**
 * Implementation of private class properties using a WeakMap.
 *
 * @returns {function(*=)}
 */
export default () => {
    const map = new WeakMap();
    return obj => {
        let props = map.get(obj);
        if (!props) {
            props = {};
            map.set(obj, props);
        }

        return props;
    }
}
