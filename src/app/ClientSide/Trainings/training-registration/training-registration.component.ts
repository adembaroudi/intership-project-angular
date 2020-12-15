import { Component, OnInit } from '@angular/core';
import { TrainingRegistration } from "../../../entities/trainingRegistration";
import { TrainingRegistrationService } from "../../../services/training-registration.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Training } from 'src/app/entities/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-registration',
  templateUrl: './training-registration.component.html',
  styleUrls: ['./training-registration.component.css']
})
export class TrainingRegistrationComponent implements OnInit {
regs = []
trainings=[];
training: Training;
registrationForm : FormGroup
  train: any;
  constructor( private trainingService : TrainingService ,private registrationServ: TrainingRegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({  
      firstname : new FormControl('' , [Validators.required] ),
      lastname : new FormControl('' , [Validators.required] ),  
      email : new FormControl('' , [Validators.required , Validators.email]),  
      numTel : new FormControl('' , [Validators.required]),
      diplome : new FormControl('' , [Validators.required] ),  
      online : new FormControl('' , [Validators.required]),  
      resterInforme : new FormControl('' , [Validators.required])
    //  training : new FormControl(training);  
    }); 
    this.trainingService.getTrainingsList().subscribe((res : any)=>{
      console.log(res);   
      this.trainings = res
      console.log(this.trainings);
      
      this.trainings.map((e)=>{
        this.trainingService.getTraining(e._id).subscribe((res : any)=>{
          console.log(res);
          this.train = res._id
          console.log(this.train);
          
        })
      })
    })
  }



  register(id){
    console.log(id);
    
    this.registrationServ.Register(id,this.registrationForm.value).subscribe();
     console.log(this.registrationForm.value);
   }

  
  

}
