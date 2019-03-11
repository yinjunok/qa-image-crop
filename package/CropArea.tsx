import * as React from 'react';
import { ICropInfo } from './CropImage';
import * as S from './sty';

interface ICropAreaProps {
  cropInfo: ICropInfo;
  showCorpArea: boolean;
  move: (disX: number, disY: number) => void;
  resize: (dir: ControllerPointer, disW: number, disH: number) => void;
}

export type ControllerPointer = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br';

class CropArea extends React.PureComponent<ICropAreaProps, {}> {
  render() {
    const { cropInfo, showCorpArea } = this.props;
    return (
      <S.CropArea
        // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex
        tabIndex={-1}
        style={{
          width: cropInfo.width,
          height: cropInfo.height,
          transform: `translate3d(${cropInfo.left}px, ${cropInfo.top}px, 0)`,
        }}
        draggable={false}
        ref={this.cropAreaRef}
        onKeyDown={this.keyDown}
        showCorpArea={showCorpArea}
        onMouseDown={this.mouseDown}
      >
        {/* 四个点 */}
        <S.Dot 
          vertical='left'
          horizontal='top'
          style={{ cursor: 'nwse-resize' }}
          onMouseDown={this.dotMouseDown('tl')}
        />
        <S.Dot
          vertical='left'
          horizontal='bottom'
          style={{ cursor: 'nesw-resize' }}
          onMouseDown={this.dotMouseDown('bl')}
        />
        <S.Dot
          vertical='right'
          horizontal='bottom'
          style={{ cursor: 'nwse-resize' }}
          onMouseDown={this.dotMouseDown('br')}
        />
        <S.Dot
          vertical='right'
          horizontal='top'
          style={{ cursor: 'nesw-resize' }}
          onMouseDown={this.dotMouseDown('tr')}
        />

        {/* 四条边 */}
        <S.Dot vertical='center'
          horizontal='top'
          style={{ cursor: 'ns-resize' }}
          onMouseDown={this.dotMouseDown('t')}
        />
        <S.Dot
          vertical='right'
          horizontal='center'
          style={{ cursor: 'ew-resize' }}
          onMouseDown={this.dotMouseDown('r')}
        />
        <S.Dot
          vertical='left'
          horizontal='center'
          style={{ cursor: 'ew-resize' }}
          onMouseDown={this.dotMouseDown('l')}
        />
        <S.Dot
          vertical='center'
          horizontal='bottom'
          style={{ cursor: 'ns-resize' }}
          onMouseDown={this.dotMouseDown('b')}
        />
      </S.CropArea>
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
  
  private dotOriginX = 0;
  private dotOriginY = 0;
  private dirPointer: ControllerPointer = 'tl';
  private dotMouseDown = (dir: ControllerPointer) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const doc = document.documentElement;
    doc.addEventListener('mousemove', this.dotMouseMove);
    doc.addEventListener('mouseup', this.dotMouseUp);
    this.dotOriginX = e.clientX;
    this.dotOriginY = e.clientY;
    this.dirPointer = dir;
  };

  private dotMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    this.props.resize(
      this.dirPointer,
      e.clientX - this.dotOriginX,
      e.clientY - this.dotOriginY,
    );
    this.dotOriginX = e.clientX;
    this.dotOriginY = e.clientY;
  };
  private dotMouseUp = () => {
    const doc = document.documentElement;
    doc.removeEventListener('mousemove', this.dotMouseMove);
    doc.removeEventListener('mouseup', this.dotMouseUp);
  }
}

export default CropArea;
