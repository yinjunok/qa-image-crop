import s, { ThemedStyledProps } from 'styled-components';
import { ICropInfo } from './CropImage';

export const Container = s.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  max-width: 100%;
  border: 1px solid red;
  background: black;
  cursor: crosshair;
`;

export const Img = s.img`
  display: block;
`;

type CropAreaProps = ThemedStyledProps<ICropInfo, {}>;
export const CropArea = s.div`
  box-sizing: border-box;
  position: absolute;
  box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
  
  left: ${(props: CropAreaProps) => {
    return props.left;
  }}
  top: ${(props: CropAreaProps) => {
    return props.top;
  }}
  width: ${(props: CropAreaProps) => {
    return props.width;
  }}
  height: ${(props: CropAreaProps) => {
    return props.height;
  }}
`;