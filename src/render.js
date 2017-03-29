import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

export function render(component, props = {}, opts = {}) {
  return ReactTestRenderer.create(React.createElement(component, props), opts);
}
