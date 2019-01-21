import * as React from 'react';
import s from 'styled-components';

const H = s.h1`
  color: red;
`
let n: string = '1';

export default () => (
  <H>Hello World</H>
);