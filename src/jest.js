export function mockPartial(realPackage, mockComponents) {
  const lib = {};
  for (const prop in realPackage) {
    if (realPackage.hasOwnProperty(prop)) {
      lib[prop] = realPackage[prop];
    }
  }
  mockComponents.forEach((name) => {
    const resetOfPath = name.split(/\./);
    const path = [];
    let source = realPackage;
    let target = lib;
    let currentName;
    while ((currentName = resetOfPath.shift())) {
      path.push(currentName);
      if (!source[currentName]) {
        throw new Error(`${path.join('.')} does not exist in mocked package?!`);
      }
      target[currentName] = mock(path.join('.'), source[currentName]);
      target = target[currentName];
      source = source[currentName];
    }
  });
  return lib;
}

export function mockFull(mockComponents) {
  const lib = {};
  mockComponents.forEach((name) => lib[name] = mock(name, {displayName: name}));
  return lib;
}

export function mock(name, real = {}) {
  const React = require('react');
  const comp = class extends React.Component {
    static displayName = real.displayName || name;
    static propTypes = real.propTypes;
    render() {
      return React.createElement(name, this.props, this.props.children);
    }
  };
  for (const prop in real) {
    if (real.hasOwnProperty(prop)) {
      comp[prop] = real[prop];
    }
  }
  return comp;
}
