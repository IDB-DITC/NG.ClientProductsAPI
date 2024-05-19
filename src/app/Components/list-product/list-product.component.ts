import { Component, inject } from '@angular/core';
import { ProductCategory } from '../../Models/product-category';
import { ProductService } from '../../Services/product.service';
import { EditSettingsModel, DetailDataBoundEventArgs, FilterSettingsModel, Grid, PageSettingsModel, ToolbarItems, SelectionSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Product } from '../../Models/product';
import { ProductReportService } from '../../Services/product-report.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  public ProductCategory: ProductCategory[] = [];

  public editSettings?: EditSettingsModel;

  public pageSettings: PageSettingsModel = { pageSize: 5 };
  public filterSettings: FilterSettingsModel = { type: 'FilterBar' };




  public toolbarOptions?: ToolbarItems[] = ['Search',
    //'Print',
    'ColumnChooser',
    //'Add', 'Edit', 'Delete', 'Update', 'Cancel',
    //'PdfExport',
    //'ExcelExport',
    //'CsvExport'
  ];

  public selectionOptions?: SelectionSettingsModel;
  public searchOptions?: SearchSettingsModel;

  private service = inject(ProductService);
  private reportService = inject(ProductReportService);




  ngOnInit(): void {
    this.LoadData();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.selectionOptions = { mode: 'Row', type: 'Single' };
    this.searchOptions = { fields: ['productCategoryID', 'name'], operator: 'contains', ignoreCase: true, ignoreAccent: true };
  }
  LoadData() {
    this.service.GetProducts().subscribe((response: ProductCategory[]) => {
      this.ProductCategory = response;
      //console.log(response);
    },
      (error) => {
        console.log('Observable emitted an error:' + error);

      });
  }

  detailDataBound(e: DetailDataBoundEventArgs) {

    var data = e.data as ProductCategory;

    let detail = new Grid({
      dataSource: data.products,
      columns: [
        { field: 'name', headerText: 'Name', width: 110 },
        { field: 'productNumber', headerText: 'Product Number', width: 140 },
        { field: 'size', headerText: 'Size', width: 40 }
      ]
    });
    detail.appendTo((e.detailElement as HTMLElement).querySelector('.custom-grid') as HTMLElement);
  }




  DeleteProduct(product: ProductCategory) {
    let confirmDelete: boolean = confirm(`Delete: ${product.name}?`);
    if (confirmDelete) {
      this.service.DeleteProduct(product.productCategoryID).subscribe(() => {
        this.LoadData();
      },
        (error) => {
          console.log('Observable emitted an error:' + error);
        });
    }
  }

  LoadReport(id: number) {

    this.reportService.GetReport(id).subscribe((data) => {

      const basedata = "data:application/pdf;base64," + data;
      this.downloadFileObject(basedata);

    }, (error) => {
      console.log('Observable emitted an error: ' + JSON.stringify(error));
    });
  }

  downloadFileObject(base64String: string) {
    const linkSource = base64String;
    const downloadLink = document.createElement("a");
    const fileName = "convertedPDFFile.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
