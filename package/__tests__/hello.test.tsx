// Link.react.test.js
import React from 'react';
import CropImage from '../CropImage';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <CropImage />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});