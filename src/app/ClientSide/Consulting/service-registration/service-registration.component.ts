import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from "../../../services/registration.service";
import { service } from "../../../entities/service";

@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.component.html',
  styleUrls: ['./service-registration.component.css']
})
export class ServiceRegistrationComponent implements OnInit {
serv = ["Consulting","Coach","Developpeur"]
  constructor(  private registrationServ: RegistrationService) { }

  ngOnInit(): void {
        
  }

  registrationForm = new FormGroup({  
    firstname : new FormControl('' , [Validators.required] ),
    lastname : new FormControl('' , [Validators.required] ),  
    email : new FormControl('' , [Validators.required]),  
    numTel : new FormControl('' , [Validators.required]),
    cv : new FormControl('' , [Validators.required] ),  
    sujet : new FormControl('' , [Validators.required]),  
    service : new FormControl('' , [Validators.required])
  });
  
  register(){
    this.registrationServ.Register(this.registrationForm.value).subscribe();
     console.log(this.registrationForm.value);
   }
   onchange(selectedValue) {
    console.log(selectedValue);
    this.registrationForm.controls["service"].setValue(selectedValue);
  }

   
  
   
   

}
