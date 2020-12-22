import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from "../../../services/registration.service";

@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.component.html',
  styleUrls: ['./service-registration.component.css']
})
export class ServiceRegistrationComponent implements OnInit {
serv = ["Consulting","Coach","Developpeur"]
data: FormData;
file: File;
  constructor(  private registrationServ: RegistrationService) { }

  ngOnInit(): void {
        
  }

  registrationForm = new FormGroup({  
    firstname : new FormControl('' , [Validators.required] ),
    lastname : new FormControl('' , [Validators.required] ),  
    email : new FormControl('' , [Validators.required]),  
    numTel : new FormControl('' , [Validators.required]),
    cv : new FormControl(''  ),  
    sujet : new FormControl('' , [Validators.required]),  
    service : new FormControl('' , [Validators.required])
  });
  
  register(){
    this.registrationServ.Register(this.registrationForm.value).subscribe((res:any)=>{   
      this.uploadCv(res.service._id)
    });
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
