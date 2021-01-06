import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {
  serv = ["Consulting","Coach","Developpeur"]
  file: File;
  constructor( private registrationServ: RegistrationService , private router : Router) { }

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
      Swal.fire('merci pour votre inscription') 
    });
    this.router.navigateByUrl("/service");
   }
  onchange(selectedValue) {
    console.log(selectedValue);
    this.registrationForm.controls["service"].setValue(selectedValue);
  
  }
}
