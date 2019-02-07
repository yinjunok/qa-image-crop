import { ICropInfo } from '../image-workspace/ImageWorkspace'

export default function(crop: ICropInfo) {
  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  if (ctx !== null) {
    ctx.drawImage(
      crop.source,
      crop.left,
      crop.top,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL();
  }
}
