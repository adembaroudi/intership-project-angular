import { Component, OnInit } from '@angular/core';
import { TrainingService } from "../../../services/training.service";
import { Training } from "../../../entities/training";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-single-training',
  templateUrl: './single-training.component.html',
  styleUrls: ['./single-training.component.css']
})
export class SingleTrainingComponent implements OnInit {
  users : []
  id: number;
  training: Training;

  TrainingPicture: String = environment.baseuri + "/training/getTrainingLogo/";


  constructor(private route: ActivatedRoute,private router: Router,
    private trainingService: TrainingService  , private userService : UserService) { }

  ngOnInit(): void {
    this.training = new Training()
    this.id = this.route.snapshot.params['id'];
    this.trainingService.getTraining(this.id)
    .subscribe((data : any) => {
      this.training = data; 
    });
    this.userService.getUsersList().subscribe((res : any)=>{
      this.users = res  
      this.users.map((e)=>{
        // this.trainingService.getTrainingsByUser()
      })
    })
   
   
    

  }

  traininReg(id: number){
 
    
    this.router.navigate(['trainingRegistration', id]);
  }
  getTrainingById(id){
    this.trainingService.getTraining(id)
    .subscribe((data : any) => {
   
      this.training = data;
    }, error => console.log(error));
  }

}
