import { Component } from '@angular/core';
import { ProductCategory } from '../../Models/product-category';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { ImageUpload } from '../../Models/imageUpload';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent
{
  public model: ProductCategory = new ProductCategory();
  id!: number;

  constructor(private Service: ProductService, private router: Router, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void
  {
    /*this.id = this.route.snapshot.params['id'];: This line retrieves a parameter(id) from the current route's URL. It's commonly used to extract dynamic values from the URL, such as an ID for fetching specific data related to that ID.Here, this.route refers to the ActivatedRoute service, which gives information about the currently activated route, and snapshot provides a static snapshot of the route information.*/

    this.id = this.route.snapshot.params['id'];
    this.LoadData();
  }

  OnSubmit()
  {

 


    this.Service.UpdateProduct(this.model).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  LoadData()
  {
    /*(data: ProductCategory) => { ... }: This is an arrow function used as a callback.When the HTTP request succeeds, the data returned is of type ProductCategory, and it's captured as data. The arrow function then assigns this data to the model property of the component and logs it to the console.*/

    this.Service.GetProduct(this.id).subscribe((data: ProductCategory) => {
      console.log(data);
      this.model = data;
      this.model.imageUpload = new ImageUpload();
      if (this.model.imagePath != null) {       
        this.model.imageUpload.imageData = this.model.imagePath;
      }
      
      console.log(data);
    }, (error: string) => {
      console.log('Observable emitted an error: ' + error);
    });
  }

  AddProduct()
  {
    this.model.products.push(new Product());
  }

  DeleteProduct(index: number)
  {
    const remItem = this.model.products.splice(index, 1);
  }
  uploadImage(imageInput: any) {

    var file: File = imageInput.files[0];
    if (file.size > 200 * 1024) {
      alert('max allowed size is 200KB');
      return;
    }
    this.model.imageUpload.getBase64(file);

  }
}
