# ReactTestRenderer Helper Utilities

## About

`react-test-renderer` allows rendering of React elements into trees of very
simple objects. This works really well with Jest's `toMatchSnapshot` matcher
which asks you to interactively approve any changes to rendering
output. Unfortunately, this breaks our beloved TDD cycle.

These helper utilities were developed to aid TDD of React Native components.

## Usage

For up-to-date example refer to `.spec.js` files.

Here's a short component test example that uses some of the API.

```javascript
import {render, filterByType, filterByTestID, mock, trigger} from '../src';
import Example from './Example';

// Mock local component, but still use static properties like `propTypes` to
// improve testing feedback.
jest.mock('./Avatar', () => mock('Avatar', require.requireActual('./Avatar').default));

describe('Example', function () {
  it('should display empty-state Avatar by default', function () {
    expect(testDriver().getAvatar().props).toEqual({
      name: '',
      image: '../assets/avatar/empty-state.png'
    });
  });

  it('should allow to provide initial name value', function () {
    expect(testDriver({name: 'Donatas Petrauskas'}).getAvatar().props.name)
      .toBe('Donatas Petrauskas');
  });

  it('should initialize text input with name value', function () {
    expect(testDriver({name: 'John Smith'}).getNameInput().props.value)
      .toBe('John Smith');
  });

  it('should update avatar name if name input changes', function () {
    expect(
      testDriver()
        .changeName('Jonas')
        .getAvatar().props.name
    ).toBe('Jonas');
  });

  describe('Phone Number', function () {
    const PHONE_NUMBER = '+1-234-56789';
    const onPhoneChange = jest.fn();
    let driver;

    beforeAll(() => driver = testDriver({onPhoneChange}));

    it('should be changeable', function () {
      driver.changePhoneNumber(PHONE_NUMBER);
    });

    it('should be reported up on change', function () {
      expect(onPhoneChange).toBeCalledWith(PHONE_NUMBER);
    });
  });
});

// It's useful to hide details of where and white kind of components we use by
// using test driver.
function testDriver(props) {
  const el = render(Example, props);
  return {
    getAvatar() {
      return filterByType('Avatar', el)[0];
    },
    getNameInput() {
      return filterByTestID('Example_NameInput', el)[0];
    },
    getPhoneInput() {
      return filterByTestID('Example_PhoneInput', el)[0];
    },
    changeName(value) {
      trigger('changeText', this.getNameInput(), value);
      return this;
    },
    changePhoneNumber(number) {
      trigger('changeText', this.getPhoneInput(), number);
      return this;
    }
  };
}
```
