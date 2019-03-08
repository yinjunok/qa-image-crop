import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CropImage from '../package/CropImage';

class App extends React.Component {
  state = {
    src: '',
  };

  render() {
    const { src } = this.state;
    return (
      <>
        <input type='file' onChange={this.inputChange} />
        {
          src && <CropImage src={src} />
        }
      </>
    );
  }

  private inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && e.target.files !== null) {
      const src = URL.createObjectURL(e.target.files[0]);
      this.setState({
        src,
      });
    }
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
