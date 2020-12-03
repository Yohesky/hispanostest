import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PetitionService } from 'src/app/services/request/petition.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() registerEdit: any
  @Output() send =  new EventEmitter();
  register: FormGroup
  edit: boolean = false
  registerToEdit: any
  
  category: any = [
    "Facturacion", "Soporte tecnico", "Ventas", "Informacion General"
  ]
  id: string = ""


  constructor(private _formBuilder: FormBuilder, private petition: PetitionService, public _router: ActivatedRoute) {
    this.register = this._formBuilder.group({
        fullName: new FormControl('', Validators.required),
        companyName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
    })
   }

  ngOnInit(): void {
   
  }

  

  ngOnChanges(){
    if(this.registerEdit !== null) {
      this.id = this.registerEdit._id
     
      
      this.edit = true
      this.register.patchValue({
        companyName: this.registerEdit.companyName,
        fullName: this.registerEdit.fullName,
        email: this.registerEdit.email,
        phone: this.registerEdit.phone,
        category: this.registerEdit.category,
        message: this.registerEdit.message
      })
    }
  }

  submit(){
    if(this.register.invalid){
      Swal.fire({
        title: "All fields are required",
        icon: "error"
      })
      
    }else{
      if(this.edit){
          this.petition.update(this.register.value, this.id)
          .then(res => {
            this.emit()
            Swal.fire({
              title: "Register succesfully updated",
              icon: "success"
            })
          })
          .catch(err => console.log(err))
      }else{
        this.petition.newRegister(this.register.value)
        .then(res => {
         
             this.register.reset()
            Swal.fire({
              title: "Register succesfully created",
              icon: "success"
            })
          
         
        })
        .catch(err => {
          Swal.fire({
            title: "Something was wrong",
            icon: "error"
          })
        })
      }
      }
      

  }

  emit(){
    this.send.emit({call: true})
  }

}
