import * as React from 'react';
import { setConfig } from 'react-hot-loader'
import { hot } from 'react-hot-loader/root'
import CropImage from '../package/CropImage';

setConfig({
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC
  pureRender: true, // RHL will not change render method
});

class App extends React.Component {
  state = {
    src: '',
    crop: '',
  };

  render() {
    const { src, crop } = this.state;
    return (
      <>
        <input type='file' onChange={this.inputChange} />
        {
          src && <CropImage src={src} onCrop={this.onCrop} />
        }
        <img src={crop} />
      </>
    );
  }

  private onCrop = (img: string | undefined) => {
    if (img) {
      this.setState({
        crop: img
      })
    }
  }

  private inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && e.target.files !== null) {
      const src = URL.createObjectURL(e.target.files[0]);
      this.setState({
        src,
      });
    }
  }
}

export default hot(App);
