import * as React from 'react';
import { ICropInfo } from './CropImage';
interface ICropAreaProps {
    cropInfo: ICropInfo;
    showCorpArea: boolean;
    move: (disX: number, disY: number) => void;
    resize: (dir: ControllerPointer, disW: number, disH: number) => void;
}
export declare type ControllerPointer = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br';
declare class CropArea extends React.PureComponent<ICropAreaProps, {}> {
    render(): JSX.Element;
    private originX;
    private originY;
    private cropAreaRef;
    private mouseDown;
    private mouseMove;
    private mouseUp;
    private keyDown;
    private dotOriginX;
    private dotOriginY;
    private dirPointer;
    private dotMouseDown;
    private dotMouseMove;
    private dotMouseUp;
}
export default CropArea;
