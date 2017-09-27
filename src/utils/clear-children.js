// @flow

/**
 * Removes all children from a node.
 *
 * @param $node DOMNode to remove children from
 */
export default ($node: Node) => {
    while ($node.firstChild) {
        $node.removeChild($node.firstChild);
    }
};
