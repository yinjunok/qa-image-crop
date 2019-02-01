import * as React from 'react';
import * as S from './sty';

interface IImageWorkspaceProps {
  src?: string; // 图片地址
}

interface IImageWorkspaceState {
  showCropArea: boolean;
  cropInfo: {
    width: number;
    height: number;
    top: number;
    left: number;
  }
}

class ImageWorkspace extends React.Component<IImageWorkspaceProps, IImageWorkspaceState> {
  state = {
    //显示截图区域
    showCropArea: false,
    // 截图区域信息
    cropInfo: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }
  }

  render() {

    const { showCropArea, cropInfo } = this.state;

    return (
      <S.Workspace>
        <S.OperatingArea
          onMouseDown={this.mouseDownHandler}
        >
          <S.Img
            src={this.props.src}
            ref={this.imgRef}
            onLoad={this.imageLoadHandler}
            draggable={false}
          />
          {
            showCropArea && <S.CropArea style={cropInfo} />
          }
        </S.OperatingArea>
      </S.Workspace>
    );
  }
  
  private imgRef = React.createRef<HTMLImageElement>();
  private imgWidth: number = 0;
  private imgHeight: number = 0;

  private mouseUpHandler = (e: MouseEvent) => {
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  private mouseDownHandler = (e: React.MouseEvent) => {
    document.addEventListener('mouseup', this.mouseUpHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
    
    const { current: img } = this.imgRef;

    let top = 0;
    let left = 0;
    if (img !== null) {
      const rect = img.getBoundingClientRect();
      top = e.clientY - rect.top;
      left = e.clientX - rect.left;
    }

    this.setState({
      showCropArea: true,
      cropInfo: {
        ...this.state.cropInfo,
        top,
        left,
      }
    });
  }

  private mouseMoveHandler = (e: MouseEvent) => {
    const { cropInfo } = this.state;

    this.setState({
      cropInfo: {
        ...cropInfo,
        width: cropInfo.width + e.movementX,
        height: cropInfo.height + e.movementY,
      }
    })
  }

  private imageLoadHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { current: img } = this.imgRef;

    if (img !== null) {
      const imgRect = img.getBoundingClientRect();
      this.imgWidth = imgRect.width;
      this.imgHeight = imgRect.height;
    }
  }
}

export default ImageWorkspace;
