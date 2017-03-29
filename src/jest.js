export function rnMock(mockPackage) {
  jest.mock(mockPackage, () => mock(mockPackage, require.requireActual(mockPackage)));
}

export function selectiveMock(mockPackage, mockComponents) {
  jest.mock(mockPackage, () => {
    const real = require.requireActual(mockPackage);
    const lib = {...real};
    mockComponents.forEach((name) => {
      if (!real[name]) {
        throw new Error(`${name} does not exist in ${mockPackage}?!`);
      }
      lib[name] = mock(name, real[name]);
    });
    return lib;
  });
}

export function fullMock(mockPackage, mockComponents) {
  jest.mock(mockPackage, () => {
    const lib = {};
    mockComponents.forEach((name) => lib[name] = mock(name, {displayName: name}));
    return lib;
  });
}

export function mock(name, real) {
  const React = require('React');
  const comp = class extends React.Component {
    static displayName = real.displayName || name;
    static propTypes = real.PropTypes;
    render() {
      return React.createElement(name, this.props, this.props.children);
    }
  };
  for (const prop in real) {
    /* eslint-disable no-prototype-builtins */
    if (real.hasOwnProperty(prop) && typeof real[prop] !== 'function') {
      comp[prop] = real[prop];
    }
    /* eslint-enable no-prototype-builtins */
  }
  return comp;
}
