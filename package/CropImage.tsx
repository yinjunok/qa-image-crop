import * as React from 'react';
import produce from 'immer';
import CropArea, { ControllerPointer } from './CropArea';
import * as S from './sty';

interface ICropImageProps {
  src: string;
}

export interface ICropInfo {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface ICropImageState {
  imgLoaded: boolean,
  cropInfo: ICropInfo;
  showCorpArea: boolean;
}

export default class CropImage extends React.Component<ICropImageProps, ICropImageState> {

  state = {
    imgLoaded: false,
    showCorpArea: false,
    cropInfo: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }
  }

  componentDidUpdate(prevProps: ICropImageProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({
        imgLoaded: false,
        showCorpArea: false,
        cropInfo: {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        }
      });
    }
  }

  render() {
    const { src } = this.props;
    const { cropInfo, showCorpArea } = this.state;
    
    return (
      <S.Container
        ref={this.containerRef}
        onMouseDown={this.mouseDown}
      >
        {
          src && 
            <S.Img
              src={src}
              draggable={false}
              onLoad={this.imgLoad}
              onMouseMove={(e: React.MouseEvent) => e.preventDefault()}
            />
        }
        <CropArea
          cropInfo={cropInfo}
          move={this.moveCrop}
          resize={this.resize}
          showCorpArea={showCorpArea}
        />
      </S.Container>
    );
  }

  /**
   *
   * 重新设置截图区域宽高尺寸
   * @private
   * @memberof CropImage
   * @param {ControllerPointer} dir 哪个拖动控制点
   * @param {number} disW 改变的宽度
   * @param {number} disH 改变的高度
   */
  private resize = (dir: ControllerPointer, disW: number, disH: number) => {
    this.setState(produce((draft => {
      const { cropInfo } = draft;
      const { containerRect: rect } = this;
      
      // 左边和上边的控制点需要同时改变宽高和定位
      if (dir.includes('l')) {
        const maxWidth = cropInfo.width + cropInfo.left;
        cropInfo.width = this.rangeNum(cropInfo.width - disW, 0, maxWidth);
        cropInfo.left = this.rangeNum(cropInfo.left + disW, 0, maxWidth);
      }
      
      if (dir.includes('t')) {
        const maxHeight = cropInfo.height + cropInfo.top;
        cropInfo.height = this.rangeNum(cropInfo.height - disH, 0, maxHeight);
        cropInfo.top = this.rangeNum(cropInfo.top + disH, 0, maxHeight);
      }
      
      // 下边和右边的控制点, 只需要改变宽度
      if (dir.includes('r')) {
        const maxWidth = rect.width - cropInfo.left;
        cropInfo.width = this.rangeNum(cropInfo.width + disW, 0, maxWidth);
      }

      if (dir.includes('b')) {
        const maxHeight = rect.height - cropInfo.top;
        cropInfo.height = this.rangeNum(cropInfo.height + disH, 0, maxHeight);
      }
    })));
  }

  private containerRef = React.createRef<HTMLDivElement>();
  private containerRect: ClientRect = {
    width: 0,
    left: 0,
    top: 0,
    height: 0,
    bottom: 0,
    right: 0,
  };
  private mouseDown = (e: React.MouseEvent) => {
    const doc = document.documentElement;
    doc.addEventListener('mousemove', this.mouseMove);
    doc.addEventListener('mouseup', this.mouseUp);

    const { current } = this.containerRef;
    if (current !== null) {
      this.containerRect = current.getBoundingClientRect();

      const rect = this.containerRect;
      // https://fb.me/react-event-pooling
      const event = e.nativeEvent;
      this.setState(produce(draft => {
        draft.showCorpArea = true;
        draft.cropInfo.left = event.x - rect.left;
        draft.cropInfo.top = event.y - rect.top;
        draft.cropInfo.width = 0;
        draft.cropInfo.height = 0;
      }));
    }
  }

  private mouseMove = (e: MouseEvent) => {
    this.setState(produce(draft => {
      const { cropInfo } = draft;
      const pos = {
        left: e.x - this.containerRect.left,
        top: e.y - this.containerRect.top,
      };
      const maxWidth = this.containerRect.width - cropInfo.left;
      const maxHeight = this.containerRect.height - cropInfo.top;

      cropInfo.width = this.rangeNum(pos.left - cropInfo.left, 0, maxWidth);
      cropInfo.height = this.rangeNum(pos.top - cropInfo.top, 0, maxHeight);
    }));
  }

  private mouseUp = () => {
    const doc = document.documentElement;
    doc.removeEventListener('mousemove', this.mouseMove);
    doc.removeEventListener('mouseup', this.mouseUp);
  }

  /**
   * 移动截图区域
   *
   * @private
   * @memberof CropImage
   * @param {number} disX 横向移动距离
   * @param {number} disY 纵向移动距离
   */
  private moveCrop = (disX: number, disY: number) => {
    this.setState(produce(draft => {
      const { cropInfo } = draft;
      const maxTop = this.containerRect.height - cropInfo.height;
      const maxLeft = this.containerRect.width - cropInfo.width;

      cropInfo.left = this.rangeNum(cropInfo.left + disX, 0, maxLeft);
      cropInfo.top = this.rangeNum(cropInfo.top + disY, 0, maxTop);
    }));
  }

  /**
   * 保证 min <= num <= max
   * @private
   * @memberof CropImage
   * @param {number} num 要保证的数字
   * @param {number} min 最小范围
   * @param {number} max 最大范围
   * @return {number} 返回被限制后的数字
   */
  private rangeNum = (num: number, min: number, max: number): number => {
    if (num < min) {
      num = min;
    }

    if (num > max) {
      num = max;
    }
    return num;
  }

  private imgLoad = () => {
    this.setState({
      imgLoaded: true,
    });
  }
}
