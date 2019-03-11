import s from 'styled-components';

export const Container = s.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  max-width: 100%;
  background: black;
  cursor: crosshair;
`;

export const Img = s.img`
  display: block;
  user-select: none;
`;

interface ICropAreaProps {
  showCorpArea: boolean;
}

export const CropArea = s.div`
  display: ${(props: ICropAreaProps) => {
    return props.showCorpArea ? 'block' : 'none';
  }};
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  cursor: move;
  outline: none;
`;

interface IDot {
  horizontal: 'top' | 'center' | 'bottom';
  vertical: 'left' | 'center' | 'right';
}

export const Dot = s.div`
  position: absolute;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  background: rgba(0, 0, 0, .3);
  border: solid 1px rgba(255, 255, 255, .8);

  top: ${(props: IDot) => {
    switch(props.horizontal) {
      case 'bottom':
        return 'auto';

      case 'top':
        return '0px';
      
      case 'center':
        return '50%';
      
      default:
        return 'auto';
    }
  }};

  left: ${(props: IDot) => {
    switch(props.vertical) {
      case 'left':
        return '0';
      case 'center':
        return '50%';
      case 'right':
        return 'auto';
      default:
        return 'auto';
    }
  }};

  bottom: ${(props: IDot) => {
    switch(props.horizontal) {
      case 'bottom':
        return '0px';
      
      default:
        return 'auto';
    }
  }};

  right: ${(props: IDot) => {
    switch(props.vertical) {
      case 'right':
        return '0px';
      
      default:
        return 'auto';
    }
  }};

  transform: ${(props: IDot) => {
    const x = props.vertical === 'center' ? '-50%' : '0';
    const y = props.horizontal === 'center' ? '-50%' : '0';

    return `translate3d(${x}, ${y}, 0)`;
  }};

  margin-top: ${(props: IDot) => {
    if (props.horizontal === 'top') {
      return '-5px';
    }

    return 0;
  }};

  margin-bottom: ${(props: IDot) => {
    if (props.horizontal === 'bottom') {
      return '-5px';
    }

    return 0;
  }};

  margin-left: ${(props: IDot) => {
    if (props.vertical === 'left') {
      return '-5px';
    }

    return 0;
  }};

  margin-right: ${(props: IDot) => {
    if (props.vertical === 'right') {
      return '-5px';
    }

    return 0;
  }};
`;