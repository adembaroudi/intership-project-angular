import { SingleTrainingComponent } from "../single-training/single-training.component";
import { Observable } from "rxjs";
import { TrainingService } from "../../../services/training.service";
import { Training } from "../../../entities/training";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import * as jwt_decode from "jwt-decode";
import { MatDialog } from "@angular/material/dialog";
import { VoteModalComponent } from "../vote-modal/vote-modal.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-trainings",
  templateUrl: "./trainings.component.html",
  styleUrls: ["./trainings.component.css"],
})
export class TrainingsComponent implements OnInit, OnDestroy {
  UserPicture: String = environment.baseuri + "/user/getUserLogo/";
  TrainingPicture: String = environment.baseuri + "/training/getTrainingLogo/";
  trainings = [];
  training: Training;
  intros = [];
  token = localStorage.getItem("token") || "";
  idVoteur ;
  decode;
  btnClicked = false
  constructor(
    private trainingService: TrainingService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    console.log("destroy training");
  }

  ngOnInit() {
    this.trainingService.getTrainingsList().subscribe((response: any) => {
      this.trainingService.onChangeTrainings.next(response);
      this.trainings = this.trainingService.onChangeTrainings.value;
      // this.trainings.map((e) => {
        // this.trainingService.getintroDesc(e._id).subscribe((res: any) => {
        //   this.intros.push(res.intro);
        //   console.log(this.intros);
        // });
      // });
    });
    if (this.token) {
      this.decode = jwt_decode(this.token);
      this.idVoteur = this.decode.data._id;
      return this.decode;
    } else {
      this.decode = null;
      return this.decode;
    }
  }

  trainingDetails(id: number) {
    this.router.navigate(["singleTraining", id]);
  }

  openModal(id, like ,event) {
    if (this.token) {
      if (this.idVoteur !== this.decode.data._id) {
        const dialogRef = this.dialog.open(VoteModalComponent);
        this.trainingService.getTraining(id).subscribe((res: any) => {
          const trani = this.trainings.find(train=>train._id == id)
          console.log(id);
          
    
          
        });
        dialogRef.afterClosed().subscribe((res) => {
          console.log(`result : ${res}`);
        });
      } else {
        this.trainingService
          .vote(id, this.idVoteur, { choice: like })
          .subscribe((response: any ) => {
            const trani = this.trainings.find(train=>train._id == id)
            console.log(id);
            
            this.trainings.map(train=>{
              if(train._id == id){
                train.nblike ++
              }
              return train
            })
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'merci pour votre reaction'
            })
          },error=>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: 'vous avez déja aimé cette publication'
            })

          });
      }
    } else if (!this.token) {
      const dialogRef = this.dialog.open(VoteModalComponent);
      this.trainingService.getTraining(id).subscribe((res: any) => {
        const trani = this.trainings.find(train=>train._id == id)      
            this.trainings.map(train=>{
              if(train._id == id){
                train.nblike ++
              }
              return train
            })
            console.log("hi");
            
      });
      dialogRef.afterClosed().subscribe((res) => {
    
        console.log(`result : ${res}`);
      
      });
    }
  }
}
