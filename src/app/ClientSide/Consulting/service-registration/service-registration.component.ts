import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from "../../../services/registration.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.component.html',
  styleUrls: ['./service-registration.component.css']
})
export class ServiceRegistrationComponent implements OnInit {
serv = ["Consulting","Coaching","Web Developpement"]
data: FormData;
file: File;
  constructor(  private registrationServ: RegistrationService , private  router : Router) { }

  ngOnInit(): void {
        
  }

  registrationForm = new FormGroup({  
    firstname : new FormControl('' , [Validators.required] ),
    lastname : new FormControl('' , [Validators.required] ),  
    email : new FormControl('' , [Validators.required]),  
    numTel : new FormControl('' , [Validators.required]),
    cv : new FormControl('',[Validators.required]  ),  
    sujet : new FormControl('' , [Validators.required]),  
    service : new FormControl('' , [Validators.required])
  });
  
  register(){
    this.registrationServ.Register(this.registrationForm.value).subscribe((res:any)=>{   
      this.uploadCv(res.service._id)
      Swal.fire('merci pour votre inscription')
    });
    this.router.navigateByUrl("/service");

   }
   onchange(selectedValue) {
    console.log(selectedValue);
    this.registrationForm.controls["service"].setValue(selectedValue);
  }
  uploadCv(id){
    this.data = new FormData();
    this.data.append("pdf", this.file , this.file.name);
    this.registrationServ.uploadCv(id ,this. data).subscribe((res:any)=>{})
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }

   
  
   
   

}
