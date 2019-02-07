import * as React from 'react';
import * as S from './sty';
import Preview from './preview/Preview';
import ImageSelect from './image-select/ImageSelect';
import produceCropImage from './produce-crop-image/produceCropImage';
import ImageWorkspace, { ICropInfo } from './image-workspace/ImageWorkspace';

interface ICropImageProps {
  onCrop?: () => void;
}

class CropImage extends React.Component<ICropImageProps, {}> {
  
  public state = {
    src: '',
    crop: '',
  }

  private imageSelect = React.createRef<ImageSelect>();

  private selectImage = () => {
    const { current: select } = this.imageSelect;
    (select as ImageSelect).select();
  }

  public render() {
    const { src } = this.state;

    return (
      <S.Container>
        <S.ImageArea>
          <ImageWorkspace
            src={src}
            onCropComplete={this.onCropComplete}
          />
        </S.ImageArea>
        <S.SideBar>
          <Preview src={this.state.crop} />
          <button onClick={this.selectImage}>选择图片</button>
        </S.SideBar>
        <ImageSelect ref={this.imageSelect} onSelect={this.selectHandler} />
      </S.Container>
    );
  }

  private onCropComplete = (crop: ICropInfo) => {
    const img = produceCropImage(crop);
    this.setState({
      crop: img,
    });
  }

  private selectHandler = (src: string) => {
    this.setState({
      src,
    });
  }
}

export default CropImage;
