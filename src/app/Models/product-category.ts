
import { ImageUpload } from "./imageUpload";
import { Product } from "./product";

export class ProductCategory {

  productCategoryID: number = 0;
  name: string = '';
  imagePath: string = '';

  imageUpload: ImageUpload = new ImageUpload();

  products: Product[] = [];


}


