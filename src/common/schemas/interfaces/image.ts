interface Iimage {
  originalname?: string;
  originImageId?: string;
  size: number;
  path: string;
  md5: string;
  width: number;
  height: number;
}

interface InewImageComplete extends Iimage {
  id: string;
  createdAt: Date;
}

interface IImageWidthAndHeight {
  width: number;
  height: number;
  size: number;
}

interface IimageBuffer {
  image: {
    type: string;
    data: any;
  };
  width: number;
}

export { Iimage, InewImageComplete, IImageWidthAndHeight, IimageBuffer };
