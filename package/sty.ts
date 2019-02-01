import s from 'styled-components';

export const Container = s.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  height: 500px;
  border: 1px solid #000;
`;

export const ImageArea = s.div`
  width: 70%;
`;

export const SideBar = s.div`
  width: 30%;
`;
