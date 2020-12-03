import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class PetitionService {
  
  constructor(private httpService : HttpService) { }

  login(user) : Promise<any> {
      return this.httpService.postWithoutToken('api/auth/signIn', user);
  }

  register(user){
    return this.httpService.postWithoutToken('api/auth/signUp', user);
  }

  newRegister(data){
    return this.httpService.post('api/registers/create', data)
  }

  allregister(){
    return this.httpService.get('api/registers/all')
  }

  delete(id){
    return this.httpService.delete(`api/registers/delete/${id}`)
  }

  update(data, id){
    return this.httpService.put(`api/registers/update/${id}`, data)
  }

 
}
