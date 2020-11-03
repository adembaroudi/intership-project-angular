import { Component, OnInit } from '@angular/core';
import { TrainingRegistration } from "../../../entities/trainingRegistration";
import { TrainingRegistrationService } from "../../../services/training-registration.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-registration',
  templateUrl: './training-registration.component.html',
  styleUrls: ['./training-registration.component.css']
})
export class TrainingRegistrationComponent implements OnInit {
regs = []
  constructor( private registrationServ: TrainingRegistrationService) { }

  ngOnInit(): void {
  }

  registrationForm = new FormGroup({  
    firstname : new FormControl('' , [Validators.required] ),
    lastname : new FormControl('' , [Validators.required] ),  
    email : new FormControl('' , [Validators.required]),  
    numTel : new FormControl('' , [Validators.required]),
    diplome : new FormControl('' , [Validators.required] ),  
    online : new FormControl('' , [Validators.required]),  
    resterInforme : new FormControl('' , [Validators.required])
  //  training : new FormControl(this.training);  
  }); 


  register(id){
    console.log(id);
    
    this.registrationServ.Register(id,this.registrationForm.value).subscribe();
     console.log(this.registrationForm.value);
   }

  
  

}
