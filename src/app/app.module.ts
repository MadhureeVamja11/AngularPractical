import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CategoryListComponent } from './components/manage-catagory/category-list/category-list.component';
import { CategoryAddComponent } from './components/manage-catagory/category-add/category-add.component';
import { ViewCategoryComponent } from './components/manage-catagory/view-category/view-category.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    CategoryAddComponent,
    ViewCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,TableModule, BrowserModule,
    BrowserAnimationsModule,ReactiveFormsModule,HttpClientModule, ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
