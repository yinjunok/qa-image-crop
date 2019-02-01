import * as React from 'react';
import s from 'styled-components';

interface IFileSelectProps {
  onSelect: (src: string) => void;
  select?: () => void;
  limit?: {
    size: number,
    width: number,
    height: number,
  }
}

const SelectInput = s.input`
  display: none;
`;

class ImageSelect extends React.Component<IFileSelectProps, {}> {
  public static defaultProps = {
    onSelect: () => {},
    select: () => {},
  }

  public select = () => {
    if (this.inputRef.current !== null) {
      this.inputRef.current.click();
    }
  }
  public render() {
    return <SelectInput
            type='file'
            ref={this.inputRef}
            onChange={this.changeHandler}
            accept='image/png, image/jpg, image/jpeg'
          />;
  }

  private inputRef = React.createRef<HTMLInputElement>();
  private changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && e.target.files !== null) {
      const url = URL.createObjectURL(e.target.files[0]);
      this.props.onSelect(url);
    }
  }
}

export default ImageSelect;
