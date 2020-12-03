import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { PetitionService } from 'src/app/services/request/petition.service';
import Swal from "sweetalert2"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup
  msgError: string = ""

  constructor(
    auth: AuthService,
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
    this.petition.login(this.user.value)    
    .then(res => {
      localStorage.setItem("token", res.data.token)
      this.router.navigate(["create-register"])
    })
    .catch(err => {
      this.msgError = err.error.msg
      Swal.fire({
        title: "Error",
        text: this.msgError,
        icon: "error"
      })
    })
  }

}
