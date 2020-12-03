import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from "@angular/router"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  isLogued(): boolean{
    if(localStorage.getItem("token"))
    {
      return true
    }
  }

  logout(){
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }

  getToken(): any{
    return localStorage.getItem("token")
  }

  
}
