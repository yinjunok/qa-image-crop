import * as React from 'react';
import ImageWorkspace from './image-workspace/ImageWorkspace';
import Preview from './preview/Preview';
import * as S from './sty';

interface ICropImageProps {
  onCrop?: () => void;
}

class CropImage extends React.Component<ICropImageProps, {}> {
  render() {
    return (
      <S.Container>
        <S.ImageArea>
          <ImageWorkspace />
        </S.ImageArea>
        <S.SideBar>
          <Preview />
        </S.SideBar>
        <S.ImageSelect />
      </S.Container>
    );
  }
}

export default CropImage;
