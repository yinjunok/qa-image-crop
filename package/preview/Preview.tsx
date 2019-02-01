import * as React from 'react';

interface IPreviewProps {
  src?: string;
}

class Preview extends React.Component<IPreviewProps, {}> {
  public render() {
    return (
      <div>
        预览一遍
      </div>
    );
  }
}

export default Preview;
