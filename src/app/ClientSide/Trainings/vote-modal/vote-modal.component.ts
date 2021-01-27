import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TrainingService } from "src/app/services/training.service";
import * as jwt_decode from "jwt-decode";
import * as bcrypt from "bcryptjs";
import { MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: "app-vote-modal",
  templateUrl: "./vote-modal.component.html",
  styleUrls: ["./vote-modal.component.css"],
})
export class VoteModalComponent implements OnInit {
  trainings = [];
  voteForm: FormGroup;
  loginForm: FormGroup;
  votId;
  idVoteur;
  token = localStorage.getItem("token") || "";
  decode;

  constructor(
    private trainingService: TrainingService,
    public dialogRef: MatDialogRef<VoteModalComponent>
  ) {}

  ngOnInit(): void {
    this.voteForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(""),
    });
  }
  register(like) {
    this.trainingService
      .registerForVote(this.voteForm.value)
      .subscribe((res: any) => {
        localStorage.setItem("token", res.data);
        this.onClickMe(like);
        this.dialogRef.close();
      });
  }

  onClickMe(like) {
    const id = this.trainingService.trainingId;
    console.log(id);
    
    this.trainingService
      .vote(id, jwt_decode(localStorage.getItem("token")).data._id, {
        choice: like,
      })
      .subscribe(
        (response: any) => {
          this.trainingService.getTrainingsList().subscribe((response: any) => {
            this.trainingService.onChangeTrainings.next(response);
            this.trainings = this.trainingService.onChangeTrainings.value;
          });
          this.trainings.find((train) => train._id == id);
          this.trainings.map((train) => {
            if (train._id == id) {
              train.nblike++;
            }
            return train;
          });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "merci pour votre reaction",
          });
        },
        (error) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: "vous avez déja aimé cette publication",
          });
        }
      );
  }
}
