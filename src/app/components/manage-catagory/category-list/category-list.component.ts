import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service'

import { ToastrService } from 'ngx-toastr';
export interface Category {
  _id: string;
  name: string;
  description: string;
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})


export class CategoryListComponent implements OnInit {

  categories!: Category[];
  cols!: any[];
  constructor(private httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getCategories();

    this.cols = [
      { field: '_id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'createdAt', header: 'Created At' }
    ];
  }

  async getCategories() {
    (await this.httpService.getCategories()).subscribe((result: any) => {
      if (result) {
        this.categories = result
      }

    },
      (error: any) => {
        if (error && error.error && error.error.error) {
          this.toastr.error(error.error.error)
        } else {
          this.toastr.error(error)
        }
      })
  }
  async delete(data: any) {
    if (confirm('Are you really want to delete this record?')) {
      (await this.httpService.deleteCategory(data._id)).subscribe((result: any) => {
        if (result) {
          this.toastr.success('Record deleted!')
          this.getCategories();
        }

      },
        (error: any) => {
          if (error && error.error && error.error.error) {
            this.toastr.error(error.error.error)
          } else {
            this.toastr.error(error)
          }
        })
    }
  }
}
