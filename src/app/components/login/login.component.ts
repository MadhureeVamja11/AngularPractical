import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service'

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength]]
    });

  }

  get f() { return this.form.controls; }

  async onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let data = {
      email: this.f.username.value,
      password: this.f.password.value
    };

    (await this.httpService.doLogin(data)).subscribe((result: any) => {

      if (result && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigateByUrl('/categories');
      }

    },
      error => {
        console.log("err", error)
        if (error && error.error && error.error.error) {
          this.toastr.error(error.error.error)
        } else {
          this.toastr.error(error)
        }
      })




  }
}
