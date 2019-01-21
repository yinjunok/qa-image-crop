// Link.react.test.js
import React from 'react';
import Hello from '../Hello';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Hello />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});