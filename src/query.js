export function getTextNodes(tree) {
  return filterBy(node => typeof node === 'string' || typeof node === 'number', tree);
}

export function filterByTestID(id, tree) {
  return filterBy(node => node.props && node.props.testID === id, tree);
}

export function filterByType(type, tree) {
  return filterBy(node => node.type === type, tree);
}

export function filterBy(p, tree) {
  return tree_fold(toJSON(tree), [], (acc, node) => p(node) ? acc.concat(node) : acc);
}

function tree_fold(node, acc, f) {
  return list_fold(
    node.children || [],
    f(acc, node),
    (acc, node) => tree_fold(node, acc, f));
}

function list_fold(list, acc, f) {
  for (let i = 0; i < list.length; i++) {
    acc = f(acc, list[i]);
  }
  return acc;
}

function tree_map(node, f) {
  if (typeof node === 'object' && node) {
    const children = node.children || [];
    return f({
      ...node,
      children: children.map((node) => tree_map(node, f))
    });
  } else {
    return f(node);
  }
}

function toJSON(component) {
  return tree_map(component.toJSON(), (node) => {
    if (typeof node === 'number') {
      return node.toString();
    } else if (node === null) {
      return '';
    }
    return node;
  });
}
