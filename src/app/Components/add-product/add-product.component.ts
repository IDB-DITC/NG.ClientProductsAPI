import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategory } from '../../Models/product-category';
import { Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { NgForm } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  @ViewChild('categoryForm') public categoryForm!: NgForm;

  public model!: ProductCategory;

  constructor(private Service: ProductService, private router: Router, private toastr: ToastrService) {

  }

  /*This is a special method within an Angular component called a "lifecycle hook." It's automatically called by Angular when the component is first initialized (hence the name "on init").*/

  ngOnInit(): void {
    this.model = new ProductCategory();
  }


  OnSubmit() {
    if (this.categoryForm.controls['name'].invalid) {
      if (this.categoryForm.controls['name'].errors?.['required']) {
        alert("category name required");
      }   
     
      return;
    }
    if (this.categoryForm.invalid) {
      alert(JSON.stringify(this.categoryForm.controls['name'].errors));

      alert("invalid form");
      return;
    }

    this.Service.SaveProduct(this.model).subscribe({
      next: () => {
        this.router.navigate([""]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  AddProduct() {

    this.model.products.push(new Product());

  }

  DeleteProduct(index: number) {

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

  //public onFileSelect: EmitType<Object> = (args: any) => {

  //  let inputElement: HTMLInputElement = document.getElementById('upload') as HTMLInputElement;
  //  inputElement.value = args.filesData[0].name;

  //  alert(JSON.stringify(args));

  //  this.toastr.success(JSON.stringify(args.filesData[0]), '', {
  //    timeOut: 2000,
  //    progressBar: true
  //  })


  //  let file:File = args.filesData[0];

  //  this.getBase64(file);

  //  alert(JSON.stringify(this.model.imageUpload));
  //}
  //public browseClick() {
  //  (document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button') as HTMLButtonElement).click();
  //  return false;
  //}
  //public getBase64(file: File): void {
  //  var reader = new FileReader();
  //  reader.readAsDataURL(file);
  //  reader.onload = (e: any) => {

  //    this.model.imageUpload.imageData = e.target.result as string;
  //    this.model.imageUpload.imageName = file.name;
  //    console.log(reader.result);

  //  };
  //  reader.onerror = (error) => {
  //    console.log('Error: ', error);
  //    return error;
  //  };

    
  //}


}
