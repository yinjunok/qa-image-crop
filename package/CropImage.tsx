import * as React from 'react';
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
}

export default class CropImage extends React.Component<ICropImageProps, ICropImageState> {
  state = {
    imgLoaded: false,
    cropInfo: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }
  }
  render() {
    const { src } = this.props;
    const { cropInfo } = this.state;
    
    return (
      <S.Container>
        {
          src && <S.Img src={src} onLoad={this.imgLoad} />
        }
        <S.CropArea {...cropInfo} />
      </S.Container>
    );
  }

  private mouseDown = (e: React.MouseEvent) => {

  }

  private imgLoad = () => {
    this.setState({
      imgLoaded: true,
    });
  }
}
