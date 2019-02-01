import s from 'styled-components';

export const Workspace = s.div`
  border-sizing: border-box;
  border: 1px solid red;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

export const OperatingArea = s.div`
  position: relative;
  user-select: none;
  display: inline-flex;
  overflow: hidden;
`;

export const Img = s.img`
  max-width: 100%;
  max-height: 500px;
`;

export const CropArea = s.div`
  position: absolute;
  box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
`;