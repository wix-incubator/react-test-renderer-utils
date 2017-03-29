import React from 'react';
import { Text, View, Image } from 'react-native';

import { render } from './render';
import { getTextNodes, filterByTestID, filterByType, filterBy } from './query';

describe('Query helpers', function () {
  it('should extract text nodes', function () {
    const comp = render(() => (
      <View>
        <Text>Hello</Text>
        <Text>World</Text>
      </View>
    ));
    expect(getTextNodes(comp)).toEqual(['Hello', 'World']);
  });

  it('should extract node by test ID', function () {
    const node = <View testID='a'></View>;
    const comp = render(() => (<View>{node}</View>));
    expect(filterByTestID('a', comp)[0].props.testID).toBe('a');
  });

  it('should extract nodes by type', function () {
    const comp = render(() => <View><Text/><Text/><Text/></View>);
    expect(filterByType('Text', comp).length).toBe(3);
    expect(filterByType('Text', comp)[0].type).toBe('Text');
  });

  it('should extract nodes meeting special requirements', function () {
    const comp = render(() => (
      <View>
        <Image source={{uri: 'https://localhost'}}/>
        <Image source={{uri: 'http://localhost'}}/>
        <Image source={{uri: 'https://localhost'}}/>
      </View>
    ));
    const isImage = isType.bind(null, 'Image');
    const isHttps = hasProp.bind(null, 'source', ({uri}) => /^https/.test(uri));
    expect(filterBy(node => isImage(node) && isHttps(node), comp).length).toBe(2);
  });
});

function isType(type, node) {
  return node && node.type === type;
}

function hasProp(prop, predicate, node) {
  return node && node.props && node.props[prop] && predicate(node.props[prop]);
}
