import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TrainingService } from "src/app/services/training.service";
import * as jwt_decode from "jwt-decode";
import * as bcrypt from 'bcryptjs';
;

@Component({
  selector: "app-vote-modal",
  templateUrl: "./vote-modal.component.html",
  styleUrls: ["./vote-modal.component.css"],
})
export class VoteModalComponent implements OnInit {
  voteForm: FormGroup;
  loginForm: FormGroup;
  votId ; 
  idVoteur ;
  token = localStorage.getItem("token") || "";
  decode ;
   
    constructor(private trainingService: TrainingService) {}
  
  ngOnInit(): void {
    this.voteForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(''),
    });
    if(this.token){
      this.decode = jwt_decode(this.token)
      this.votId = this.decode.data._id;
      console.log(this.votId);   
      return this.decode
    }
    else{
      console.log("hello");
      
      this.decode = null
      return this.decode
    }

    
  }
  register(like) {
    this.trainingService
      .registerForVote(this.voteForm.value)
      .subscribe((res: any) => {
        console.log(res);   
        localStorage.setItem("token", res.data);
        // if(this.token){
        //   this.decode = jwt_decode(this.token)
        //   localStorage.setItem("Idvoteur" ,this.decode.data._id)
        // }
        
        // console.log(this.decode.data._id);
    // const salt = 10;
    // const id =  bcrypt.hash(this.decode.data._id, salt);
    this.onClickMe(this.votId ,like)
  });
  
}
onClickMe( idvot, like) {
  const id = this.trainingService.trainingId
  if(this.token){
    this.decode= jwt_decode(this.token)
    idvot = this.decode.data._id;
    this.trainingService
    .vote(id, idvot, { choice: like })
    .subscribe((response: any) => {
      this.trainingService.onChangeTrainings.next(response);

    })
  }
}
// login() {
//   this.trainingService
//   .loginForVote(this.loginForm.value)
//   .subscribe((res: any) => {
//     console.log(res);
//     localStorage.setItem("token", res.voteur);
//   });
// }
}
