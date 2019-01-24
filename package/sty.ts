import s from 'styled-components';

export const Container = s.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  height: 618px;
  border: 1px solid #000;
`;

export const ImageArea = s.div`
  width: 618px;
`;

export const SideBar = s.div`
  width: 382px;
`;

export const ImageSelect = s.input`
  display: none;
`;