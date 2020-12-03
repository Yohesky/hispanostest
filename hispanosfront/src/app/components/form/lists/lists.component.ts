import { Component, OnInit } from '@angular/core';
import { PetitionService } from 'src/app/services/request/petition.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  registers: any [] 
  registertodit: any


  constructor(private petition: PetitionService, private spinner: NgxSpinnerService,  public router: Router,) { }

  ngOnInit(): void {
    this.chargingList()
  }
  

  chargingList(){
      
      this.petition.allregister()
      .then(res => {
        console.log(res);
        
        this.registers = res.data

        console.log(this.registers);
        
      })
      .catch(err => console.log(err))
  }


  editing(register){
    console.log(register);
    this.registertodit = register
  }

  delete(register){
      this.petition.delete(register)
      .then(res => {
        this.chargingList()
      })
      .catch(err => console.log(err))
  }

  callApi(e){
    if(e.call){
      this.chargingList()
    }
    
    
  }

}
