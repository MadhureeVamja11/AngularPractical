import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  header: any
  token!: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

  }

  async doLogin(data: any) {
    return this.http.post(`${environment.API_URL}/auth/login`, data)
  }
  async logout() {
    let basic = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    return this.http.post(`${environment.API_URL}/auth/logout`, {}, { headers: headers })
  }
  async addcategory(data: any) {

    let basic = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    return this.http.post(`${environment.API_URL}/category`, data, { headers: headers })
  }

  async updateCategory(data: any, id: any) {

    let basic = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    return this.http.put(`${environment.API_URL}/category/${id}`, data, { headers: headers })
  }

  async getCategories() {
    let basic = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    return this.http.get(`${environment.API_URL}/category`, { headers: headers })

  }

  async getCategorybyId(id: any) {
    let basic = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    return this.http.get(`${environment.API_URL}/category/${id}`, { headers: headers })

  }
  async deleteCategory(id: any) {
    let basic = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    return this.http.delete(`${environment.API_URL}/category/${id}`, { headers: headers })

  }
}
