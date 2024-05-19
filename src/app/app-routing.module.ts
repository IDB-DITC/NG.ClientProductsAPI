import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { ListProductComponent } from './Components/list-product/list-product.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { AuthGuard } from './Authentication/auth.guard';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { UsersComponent } from './Authentication/users/users.component';
import { AssignRoleComponent } from './Authentication/assign-role/assign-role.component';
import { RolesComponent } from './Authentication/roles/roles.component';

const routes: Routes = [
  { path: "", redirectTo: "/ProductCategory", pathMatch: "full" },
  {
    path: "ProductCategory",
    component: ListProductComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
    //data: { roles: ['Admin'] }
  },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "userlist", component: UsersComponent, canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "role-index", component: RolesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "assignrole/:id", component: AssignRoleComponent, canActivate: [AuthGuard],
    data: { roles: ['Admin','Manager'] }
  },
  {
    path: "ProductCategory/create", component: AddProductComponent, canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  /*The : id part is a placeholder for a dynamic segment that will be captured by the route.*/
  { path: "ProductCategory/:id/update", component: EditProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] } },
  {
    path: "ProductCategory/edit/:id", component: EditProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] }
  },
  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//, { onSameUrlNavigation: 'reload' } 
export class AppRoutingModule { }
