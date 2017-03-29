import React, {Component} from 'react';
import { Text, View } from 'react-native';

import { render } from './render';
import { filterByType, getTextNodes } from './query';
import { onPress, trigger } from './event';

describe('Events', function () {
  it('should emit onPress event', function () {
    expect(testDriver(Stateful).tap().getText())
      .toEqual('Press count: 1');
  });

  it('should throw if node does not handle press event', function () {
    expect(() => testDriver(Stateful).badTap())
      .toThrow('Given node does not have `onPress` callback prop.');
  });

  it('should throw if node does not handle custom `click` event', function () {
    expect(() => testDriver(Stateful).badEvent())
      .toThrow('Given node does not have `onClick` callback prop.');
  });
});

class Stateful extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  render() {
    return (
      <View onPress={() => this.onPress()}>
        <Text>Press count: {this.state.count}</Text>
      </View>
    );
  }

  onPress() {
    this.setState({count: this.state.count + 1});
  }
}

function testDriver(component) {
  const comp = render(component);
  return {
    tap() {
      onPress(filterByType('View', comp)[0]);
      return this;
    },
    badTap() {
      onPress(filterByType('Text', comp)[0]);
    },
    badEvent() {
      trigger('click', filterByType('View', comp)[0]);
    },
    getText() {
      return getTextNodes(comp).join('');
    }
  };
}
