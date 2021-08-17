import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategoryAddComponent } from './components/manage-catagory/category-add/category-add.component';
import { CategoryListComponent } from './components/manage-catagory/category-list/category-list.component';
import { ViewCategoryComponent } from './components/manage-catagory/view-category/view-category.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path : '',component:LoginComponent},
  {path : 'login',component:LoginComponent},
  {
    path:'categories',
    canActivate: [AuthGuard],
    component:CategoryListComponent
  },
  {
    path:'category',
    canActivate: [AuthGuard],
    component:CategoryAddComponent
  },
  {
    path:'category/:id',
    canActivate: [AuthGuard],
    component:CategoryAddComponent
  },
  {
    path:'view-category/:id',
    canActivate: [AuthGuard],
    component:ViewCategoryComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
