import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {
  serv = ["Consulting","Coach","Developpeur"]
  file: File;
  constructor( private registrationServ: RegistrationService) { }

  ngOnInit(): void {
  }
  registrationForm = new FormGroup({  
    companyName : new FormControl('' , [Validators.required] ),
    email : new FormControl('' , [Validators.required]),  
    numTel : new FormControl('' , [Validators.required]), 
    sujet : new FormControl('' , [Validators.required]),  
    service : new FormControl('' , [Validators.required])
  });
  
  register(){
    this.registrationServ.companyRegister(this.registrationForm.value).subscribe((res:any)=>{   
    });
   }
  onchange(selectedValue) {
    console.log(selectedValue);
    this.registrationForm.controls["service"].setValue(selectedValue);
  
  }
}
