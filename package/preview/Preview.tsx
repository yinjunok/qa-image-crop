import * as React from 'react';
import s from 'styled-components';

const Img = s.img`
  max-width: 100%;
  max-height: 100%;
`;

interface IPreviewProps {
  src?: string;
}

class Preview extends React.Component<IPreviewProps, {}> {
  public render() {
    return (
      <div>
        <Img src={this.props.src} />
      </div>
    );
  }
}

export default Preview;
