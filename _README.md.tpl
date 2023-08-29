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
<% example %>```
