import { Injectable } from '@angular/core';
import {HttpService} from './http.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService : HttpService) { }
}
