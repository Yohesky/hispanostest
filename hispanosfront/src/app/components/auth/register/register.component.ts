import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { PetitionService } from 'src/app/services/request/petition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: FormGroup
  msgError: string = ""
  constructor(
    public router: Router,
    private _formBuilder: FormBuilder,
    private petition: PetitionService
  ) {
    this.user = this._formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  

  submit(){
    if(this.user.valid){
      this.petition.register(this.user.value)    
    .then(res => {
     Swal.fire({
      icon: 'success',
      title: 'Sera redireccionado al Login',
      }).
      then(result => this.router.navigate(["login"]))
      
    })
    .catch(err => {
      this.msgError = err.error.msg
     
      Swal.fire({
        title: "Error",
        text: this.msgError,
        icon: "error"
      })
    })
    }else{
      Swal.fire({
        title: "error",
        text: "All fields are required",
        icon: "error"
      })
    }
    
  }

}
