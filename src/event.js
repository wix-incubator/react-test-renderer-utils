import ReactTestRenderer from 'react-test-renderer';

export function trigger(event, node, ...args) {
  const handlerName = `on${event[0].toUpperCase()}${event.substring(1)}`;
  const callback = node.props[handlerName];
  if (!callback) {
    throw new Error(`Given node does not have \`${handlerName}\` callback prop.`);
  }
  ReactTestRenderer.unstable_batchedUpdates(() => callback(...args));
}

export const onPress = trigger.bind(null, 'press');
