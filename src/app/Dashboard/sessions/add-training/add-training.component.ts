import { Component, Input, OnInit } from "@angular/core";
import {
  FormControl,
  FormControlDirective,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/entities/User";
import { MemberService } from "src/app/services/member.service";
import { TrainingService } from "src/app/services/training.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-training",
  templateUrl: "./add-training.component.html",
  styleUrls: ["./add-training.component.css"],
})
export class AddTrainingComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/user/getUserLogo/";
  trainingForm: FormGroup;
  niveau = ["Begginer", "Intermediate", " Advanced"];
  category = ["Web_Development", "Data_Science", "AI"];
  members = [];
  idMembers :any
  file: File;
  data: FormData;
  user: User;
  id;
  constructor(
    private trainingService: TrainingService,
    public memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainingForm = new FormGroup({
      prix: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      Description: new FormControl("", Validators.required),
      nbParticipants: new FormControl("", Validators.required),
      nbHeuresD: new FormControl("", Validators.required),
      nbHeuresND: new FormControl("", Validators.required),
      level: new FormControl( Validators.required),
      picture: new FormControl("", Validators.required),
      member: new FormControl("", Validators.required),
      TrainingCategory: new FormControl( Validators.required),
    });
    this.memberService.getAllMembers().subscribe((res: any) => {
      console.log(res);
      // if(res.find(e=>e.role == "Coach"||"Developpeur")){
        this.members = res
        console.log(this.members);
        
      // }
      
    });
  }
  onchange(selectedValue) {
    this.trainingForm.controls["level"].setValue(selectedValue);
  }
  onchangeCategory(selectedValue) {
    this.trainingForm.controls["TrainingCategory"].setValue(selectedValue);
  }
  onchangeMember(selectedValue ) {
     this.idMembers = selectedValue
    this.trainingForm.controls["member"].setValue(selectedValue);
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  addTraining(id) {
      this.trainingService
        .createTraining(id, this.trainingForm.value)
        .subscribe((response: any) => {
          Swal.fire({title:"la session est bien ajouté" , icon:"success"})
          this.uploadLogoTraining(response.training._id);
          this.router.navigateByUrl('/listtraining')
        },error=>{
          Swal.fire({title:"oups il ya un probléme" , icon:"error"})
        }
        );  
  }
  uploadLogoTraining(id) {
    this.data = new FormData();
    this.data.append("image", this.file, this.file.name);
    this.trainingService
      .uplodLogoTraining(id, this.data)
      .subscribe((res: any) => {},error=>{Swal.fire({title:"l'upload de l'image n'est pas abouti", icon:"error"})});
  }
  logout() {
    Swal.fire({
      title: 'etes vous sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui !'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('adminToken');
    this.router.navigate(['/']);
        Swal.fire(
          'Deconnecté!',
          'success'
        )
      }else{
        Swal.fire({title:"oups ! il ya un probléme " , icon:"error"})
      }
    })
  }
}
