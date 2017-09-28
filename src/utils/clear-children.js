// @flow

/**
 * Removes all children from a node.
 *
 * @param $node DOMNode to remove children from
 * @return {boolean} True, if successfull
 */
export default ($node: Node): boolean => {
    if (!$node) {
        return false;
    }

    while ($node.firstChild) {
        $node.removeChild($node.firstChild);
    }

    return true;
};
