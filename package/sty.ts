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
  user-select: none;
`;

interface ICropAreaProps {
  showCorpArea: boolean;
}

export const CropArea = s.div`
  display: ${(props: ICropAreaProps) => {
    return props.showCorpArea ? 'block' : 'none';
  }};
  box-sizing: border-box;
  position: absolute;
  box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 0, 0, .5);
  cursor: move;
  outline: none;
`;