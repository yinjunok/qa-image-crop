import * as React from 'react';
import { ICropInfo } from './CropImage';
import * as S from './sty';

interface ICropAreaProps {
  cropInfo: ICropInfo;
  showCorpArea: boolean;
  move: (disX: number, disY: number) => void;
}

class CropArea extends React.Component<ICropAreaProps, {}> {
  render() {
    const { cropInfo, showCorpArea } = this.props;
    return (
      <S.CropArea
        // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex
        tabIndex={-1}
        style={cropInfo}
        draggable={false}
        ref={this.cropAreaRef}
        onKeyDown={this.keyDown}
        showCorpArea={showCorpArea}
        onMouseDown={this.mouseDown}
      />
    );
  }
  
  private originX = 0;
  private originY = 0;
  private cropAreaRef = React.createRef<HTMLDivElement>();
  private mouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const doc = document.documentElement;
    doc.addEventListener('mousemove', this.mouseMove);
    doc.addEventListener('mouseup', this.mouseUp);
    this.originX = e.clientX;
    this.originY = e.clientY;
  }

  private mouseMove = (e: MouseEvent) => {
    const disX = e.clientX - this.originX;
    const disY = e.clientY - this.originY;
    this.originX = e.clientX;
    this.originY = e.clientY;
    this.props.move(disX, disY);
  }

  private mouseUp = () => {
    const doc = document.documentElement;
    doc.removeEventListener('mousemove', this.mouseMove);
    doc.removeEventListener('mouseup', this.mouseUp);
  }

  private keyDown = (e: React.KeyboardEvent) => {
    const { move } = this.props;

    switch(e.keyCode) {
      case 37:
        move(-1, 0);
        break;

      case 38:
        move(0, -1);
        break;
      
      case 39:
        move(1, 0);
        break;
      
      case 40:
        move(0, 1);
        break;
      
      default:
        return;
    }
  }
}

export default CropArea;
