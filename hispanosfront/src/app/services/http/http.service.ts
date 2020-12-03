import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token : string = '';
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) 
  { 
    this.token = this.auth.getToken()
  }


  get(url: string, params?: any) : Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `Bearer ${this.token}`);   
      
      return this.http.get(`${environment.api_url}${url}`, {params: params, headers: headers})
      .subscribe((response : any) => {
        resolve({data: response, msg: 'success'});
          
        },(error) : any => {
          reject( error);
        });
    });
  }

  post(url : string, params? : any) : Promise<any> {
   
    let headers = new HttpHeaders()
    .append('Content-Type', 'application/json')    
    .append('Authorization', `Bearer ${this.token}`);

    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.api_url}${url}`, params, {params: params})
      .subscribe((response : any) => {
        console.log("=> response http", response);
        
        resolve({data: response, msg: 'success'});
        },(error) : any => {
          reject( error);
        });
    });
  }

  put(url : string, params? : any) : Promise<any> {
   
    let headers = new HttpHeaders()
    .append('Content-Type', 'application/json')    
    .append('Authorization', `Bearer ${this.token}`);

    return new Promise((resolve, reject) => {
      return this.http.put(`${environment.api_url}${url}`, params, {params: params})
      .subscribe((response : any) => {
        console.log("=> response http", response);
        
        resolve({data: response, msg: 'success'});
        },(error) : any => {
          reject( error);
        });
    });
  }

  delete(url : string, params? : any) : Promise<any> {
   
    let headers = new HttpHeaders()
    .append('Content-Type', 'application/json')    
    .append('Authorization', `Bearer ${this.token}`);

    return new Promise((resolve, reject) => {
      return this.http.delete(`${environment.api_url}${url}`, params)
      .subscribe((response : any) => {
        console.log("=> response http", response);
        
        resolve({data: response, msg: 'success'});
        },(error) : any => {
          reject( error);
        });
    });
  }

  postWithoutToken(url: string, params?: any) : Promise<any> {
 
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.api_url}${url}`, params, {params: params})
      .subscribe((response : any) => {
        resolve({data: response, msg: 'success'});
        },(error) : any => {
          reject( error);
        });
    });
  }
}
