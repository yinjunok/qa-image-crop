import * as React from 'react';
import produce from 'immer';
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
          ref={this.operatingAreaRef}
          // onClick={this.clickHandler}
          onMouseDown={this.mouseDownHandler}
        >
          <S.Img
            src={this.props.src}
            ref={this.imgRef}
            onLoad={this.imageLoadHandler}
            draggable={false}
          />

          {
            showCropArea && 
              <S.CropArea
                style={cropInfo}
                // onMouseUp={this.cropMouseUpHandler}
                onMouseDown={this.cropMouseDownHandler}
              />
          }
        </S.OperatingArea>
      </S.Workspace>
    );
  }
  
  private imgRef = React.createRef<HTMLImageElement>();
  private operatingAreaRef = React.createRef<HTMLDivElement>();
  private imgWidth: number = 0;
  private imgHeight: number = 0;
  private naturalWidth: number = 0;
  private naturalHeight: number = 0;

  private mouseUpHandler = (e: MouseEvent) => {
    if (
      e.clientX <= this.startPoint.x ||
      e.clientY <= this.startPoint.y
    ) {
      this.setState({
        showCropArea: false,
      });
    }
    this.startPoint = {
      x: 0,
      y: 0,
    }
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mousemove', this.cropMouseMoveHandler);
  }

  private startPoint = {
    x: 0,
    y: 0,
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

    this.startPoint = {
      x: e.clientX,
      y: e.clientY,
    }

    this.setState({
      showCropArea: true,
      cropInfo: {
        width: 0,
        height: 0,
        top,
        left,
      }
    });
  }

  private mouseMoveHandler = (e: MouseEvent) => {
    const { cropInfo } = this.state;

    let width = cropInfo.width + e.movementX;
    let height = cropInfo.height + e.movementY;
    if (width > this.imgWidth - cropInfo.left) {
      width = this.imgWidth - cropInfo.left;
    }

    if (height > this.imgHeight - cropInfo.top) {
      height = this.imgHeight - cropInfo.top;
    }

    this.setState({
      cropInfo: {
        ...cropInfo,
        width,
        height,
      }
    })
  }

  private imageLoadHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { current: img } = this.imgRef;

    if (img !== null) {
      const imgRect = img.getBoundingClientRect();
      this.imgWidth = imgRect.width;
      this.imgHeight = imgRect.height;
      this.naturalWidth = img.naturalWidth;
      this.naturalHeight = img.naturalHeight;
    }
  }

  private cropMouseDownHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    document.addEventListener('mouseup', this.mouseUpHandler);
    document.addEventListener('mousemove', this.cropMouseMoveHandler);
  }

  private cropMouseUpHandler = (e: React.MouseEvent) => {
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.removeEventListener('mousemove', this.cropMouseMoveHandler);
  }

  private cropMouseMoveHandler = (e: MouseEvent) => {
    const { cropInfo } = this.state;

    const { current } = this.operatingAreaRef;
    
    const areaRect = (current as HTMLDivElement).getBoundingClientRect();
    
    let left = cropInfo.left + e.movementX;
    let top = cropInfo.top + e.movementY;

    if (left < 0) {
      left = 0;
    }

    if (top < 0) {
      top = 0;
    }

    if (top > areaRect.height - cropInfo.height) {
      top = areaRect.height - cropInfo.height;
    }

    if (left > areaRect.width - cropInfo.width) {
      left = areaRect.width - cropInfo.width;
    }

    this.setState({
      cropInfo: {
        ...cropInfo,
        left,
        top,
      }
    });
  }
}

export default ImageWorkspace;
