import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductComponent } from './Components/list-product/list-product.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './Authentication/auth.interceptor';
import {
  AggregateService, ColumnChooserService, ColumnMenuService, EditService, FilterService, GridModule, GroupService, PageService, PagerModule, ReorderService, ResizeService, SortService, SearchService,
  SelectionService,  ExcelExportService, PdfExportService, DetailRowService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { AuthService } from './Authentication/auth.service';
import { RegisterComponent } from './Authentication/register/register.component';
import { UsersComponent } from './Authentication/users/users.component';
import { AssignRoleComponent } from './Authentication/assign-role/assign-role.component';
import { RolesComponent } from './Authentication/roles/roles.component';
import { ErrorInterceptor } from './Authentication/error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
    RegisterComponent,
    UsersComponent,
    AssignRoleComponent,
    RolesComponent

  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, CommonModule, ReactiveFormsModule,
    GridModule, PagerModule, ChartModule, TextBoxModule, UploaderModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    //AuthService,
    PageService, SortService, FilterService, GroupService, EditService, AggregateService,
    ColumnChooserService, ColumnMenuService, ResizeService, ReorderService, SearchService,
    SelectionService, ExcelExportService, PdfExportService, DetailRowService, ToolbarService, 
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
