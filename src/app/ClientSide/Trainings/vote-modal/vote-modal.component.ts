import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TrainingService } from "src/app/services/training.service";
import * as jwt_decode from "jwt-decode";
import * as bcrypt from 'bcryptjs';
@Component({
  selector: "app-vote-modal",
  templateUrl: "./vote-modal.component.html",
  styleUrls: ["./vote-modal.component.css"],
})
export class VoteModalComponent implements OnInit {
  voteForm: FormGroup;
  loginForm: FormGroup;
  votId ; 
  idVoteur = localStorage.getItem("Idvoteur")||""
  token = localStorage.getItem("token") || ""
  decode = jwt_decode(this.token)||"";
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.voteForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(''),
    });
    this.votId = this.decode.data._id;
  }
  register(like) {
    this.trainingService
      .registerForVote(this.voteForm.value)
      .subscribe((res: any) => {
        console.log(res);   
    localStorage.setItem("token", res.data);
    this.onClickMe(this.votId ,like)
    // const salt = 10;
    // const id =  bcrypt.hash(this.decode.data._id, salt);
  });
  
}
login() {
  this.trainingService
  .loginForVote(this.loginForm.value)
  .subscribe((res: any) => {
    console.log(res);
    localStorage.setItem("token", res.voteur);
  });
}
onClickMe( idvot, like) {
  localStorage.setItem("Idvoteur" ,this.decode.data._id)
  const id = this.trainingService.trainingId
  idvot = this.decode.data._id;
  this.trainingService
  .vote(id, idvot, { choice: like })
  .subscribe((response: any) => {
    this.trainingService.onChangeTrainings.next(response);
      });
  }
}
