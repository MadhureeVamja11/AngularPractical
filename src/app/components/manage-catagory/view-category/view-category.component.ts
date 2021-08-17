import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  id!: string;
  category: any = {}
  constructor(private route: ActivatedRoute,
    private router: Router, private httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getCategorybyId()
    }
  }
  async getCategorybyId() {
    (await this.httpService.getCategorybyId(this.id)).subscribe((result: any) => {
      if (result) {
        this.category = result
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

  back() {
    this.router.navigateByUrl('/categories');
  }

}
