import { SingleTrainingComponent } from "../single-training/single-training.component";
import { Observable } from "rxjs";
import { TrainingService } from "../../../services/training.service";
import { Training } from "../../../entities/training";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-trainings",
  templateUrl: "./trainings.component.html",
  styleUrls: ["./trainings.component.css"],
})
export class TrainingsComponent implements OnInit, OnDestroy {
  UserPicture: String = environment.baseuri + "/user/getUserLogo/";
  TrainingPicture: String = environment.baseuri + "/training/getTrainingLogo/";
 clicked  = false
  trainings: Training[];
  training: Training;

  constructor(
    private trainingService: TrainingService,
    private router: Router
  ) {}

  //life cycle hooks
  ngOnDestroy(): void {
    console.log("destroy training");
  }

  ngOnInit() {
    // this.reloadData();
    // console.log("init training");

    this.trainingService.getTrainingsList().subscribe((response: any) => {
      console.log(response);
      this.trainings = response;
    });

    this.trainingService.getTrainingsList().subscribe((response: any) => {
      this.trainingService.onChangeTrainings.next(response);
    });

    this.trainingService.onChangeTrainings.subscribe((data: any) => {
      console.log("dataaa", data);
      this.trainings = data;
      // this.trainings.map(blog => {
      //   this.trainingService.getIntroDesc(blog.id).subscribe((res: any) => {
      //     blog['subtitle'] = res.jsonString;
      //   });
      // });
    });
  }

  trainingDetails(id: number) {
    this.router.navigate(["singleTraining", id]);
    console.log(id);
    
  }

  onClickMe(id , like){
    this.trainingService.like(id , {choice : "like"}).subscribe((response:any)=>{
      this.trainingService.onChangeTrainings.next(response)
   });;
  }
}
