import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service'

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  form!: FormGroup;
  id: string | undefined;
  isAddMode: boolean = true;
  loading = false;
  submitted = false;
  category = {}
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    if (this.id) {
      this.getCategorybyId()
    }

  }

  get f() { return this.form.controls; }

  async getCategorybyId() {
    (await this.httpService.getCategorybyId(this.id)).subscribe((result: any) => {
      if (result) {
        this.category = result
        this.setFormValue(this.category)
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
  setFormValue(data: any) {

    this.form.patchValue({
      name: data.name,
      description: data.description
    })
  }

  async saveDetail() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.isAddMode) {
      let data = {
        name: this.f.name.value,
        description: this.f.description.value
      };
      (await this.httpService.addcategory(data)).subscribe((result: any) => {
        if (result) {
          this.toastr.success('Success!')
          this.router.navigateByUrl('/categories');
        }

      },
        (error: any) => {
          if (error && error.error && error.error.error) {
            this.toastr.error(error.error.error)
          } else {
            this.toastr.error(error)
          }
        })
    } else {
      let data = {
        name: this.f.name.value,
        description: this.f.description.value
      };
      (await this.httpService.updateCategory(data, this.id)).subscribe((result: any) => {
        if (result) {
          this.toastr.success('Success!')
          this.router.navigateByUrl('/categories');
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
