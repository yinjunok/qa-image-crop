import * as React from 'react';
interface ICropImageProps {
    src: string;
    onCrop?: (img: string | undefined) => void;
    cropImgType?: 'blob' | 'base64';
}
export interface ICropInfo {
    width: number;
    height: number;
    left: number;
    top: number;
}
interface ICropImageState {
    imgLoaded: boolean;
    cropInfo: ICropInfo;
    showCorpArea: boolean;
}
export default class CropImage extends React.Component<ICropImageProps, ICropImageState> {
    static defaultProps: {
        cropImgType: string;
    };
    state: {
        imgLoaded: boolean;
        showCorpArea: boolean;
        cropInfo: {
            width: number;
            height: number;
            left: number;
            top: number;
        };
    };
    componentDidUpdate(prevProps: ICropImageProps): void;
    render(): JSX.Element;
    /**
     *
     * 重新设置截图区域宽高尺寸
     * @private
     * @memberof CropImage
     * @param {ControllerPointer} dir 哪个拖动控制点
     * @param {number} disW 改变的宽度
     * @param {number} disH 改变的高度
     */
    private resize;
    private containerRef;
    private imgRef;
    private containerRect;
    private mouseDown;
    private mouseMove;
    private mouseUp;
    /**
     * 移动截图区域
     *
     * @private
     * @memberof CropImage
     * @param {number} disX 横向移动距离
     * @param {number} disY 纵向移动距离
     */
    private moveCrop;
    /**
     * 保证 min <= num <= max
     * @private
     * @memberof CropImage
     * @param {number} num 要保证的数字
     * @param {number} min 最小范围
     * @param {number} max 最大范围
     * @return {number} 返回被限制后的数字
     */
    private rangeNum;
    private getCroppedImg;
    private imgLoad;
}
export {};
