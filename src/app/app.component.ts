import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'category-demo';
  token: any = ''
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token')
  }

  async logout() {
    (await this.httpService.logout()).subscribe((result: any) => {
      if (result) {
        localStorage.clear();
        this.token = ''
        this.router.navigateByUrl('/');
      }

    },
      (error: any) => {
        console.log("err", error)
      })
  }

  isLoggedIn() {
    if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
      return true
    }
    return false
  }
}
