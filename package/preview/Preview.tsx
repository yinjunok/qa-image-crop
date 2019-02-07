import * as React from 'react';

interface IPreviewProps {
  src?: string;
}

class Preview extends React.Component<IPreviewProps, {}> {
  public render() {
    return (
      <div>
        <img src={this.props.src} />
      </div>
    );
  }
}

export default Preview;
