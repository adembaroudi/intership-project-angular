import { Component, OnInit } from '@angular/core';
import { TrainingService } from "../../../services/training.service";
import { Training } from "../../../entities/training";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-training',
  templateUrl: './single-training.component.html',
  styleUrls: ['./single-training.component.css']
})
export class SingleTrainingComponent implements OnInit {
  id: number;
  training: Training;

  constructor(private route: ActivatedRoute,private router: Router,
    private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.training = new Training();

    this.id = this.route.snapshot.params['id'];
    
    this.trainingService.getTraining(this.id)
      .subscribe((data : any) => {
        console.log(data)
        this.training = data;
      }, error => console.log(error));
  }

  traininReg(id: number){
    this.router.navigate(['trainingRegistration', id]);
  }

}
