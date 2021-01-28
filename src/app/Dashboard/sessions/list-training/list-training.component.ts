import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Training } from "src/app/entities/training";
import { MemberService } from "src/app/services/member.service";
import { TrainingService } from "src/app/services/training.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-training",
  templateUrl: "./list-training.component.html",
  styleUrls: ["./list-training.component.css"],
})
export class ListTrainingComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/training/getTrainingLogo/";
  imageBaseUrl: String = environment.baseuri + "/user/getUserLogo/";
  niveau = ["Begginer", "Intermediate", " Advanced"];
  category = ["Web_Development", "Data_Science", "AI"];
  Search = "";
  trainings = [];
  updateForm: FormGroup;
  file: File;
  data: FormData;
  index;
  idMember;
  trainingID;
  members = [];
  constructor(
    private trainingService: TrainingService,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainingService.getTrainingsList().subscribe((res: any) => {
      this.trainings = res;
    });
    this.memberService.getAllMembers().subscribe((res: any) => {
      this.members = res;
    });
    this.updateForm = new FormGroup({
      prix: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      Description: new FormControl("", Validators.required),
      picture: new FormControl("", Validators.required),
      nbParticipants: new FormControl("", Validators.required),
      nbHeuresD: new FormControl("", Validators.required),
      nbHeuresND: new FormControl("", Validators.required),
      nblike: new FormControl("", Validators.required),
      level: new FormControl("", Validators.required),
      TrainingCategory: new FormControl("", Validators.required),
      member: new FormControl("", Validators.required),
    });
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  onchange(selectedValue) {
    console.log(selectedValue);
    this.updateForm.controls["level"].setValue(selectedValue);
  }
  onchangeMember(selectedValue) {
    this.idMember = selectedValue;
    console.log(this.idMember);
    this.updateForm.controls["member"].setValue(selectedValue);
  }
  onchangeCategory(selectedValue) {
    this.updateForm.controls["TrainingCategory"].setValue(selectedValue);
  }
  modalOpened(i, training) {
    this.trainingID = training;
    this.updateForm = new FormGroup({
      prix: new FormControl(training.prix),
      title: new FormControl(training.title),
      Description: new FormControl(training.Description),
      nbParticipants: new FormControl(training.nbParticipants),
      nbHeuresD: new FormControl(training.nbHeuresD),
      nbHeuresND: new FormControl(training.nbHeuresND),
      level: new FormControl(training.level),
      TrainingCategory: new FormControl(training.TrainingCategory),
      picture: new FormControl(this.trainings[i].picture),
      member: new FormControl(training.member),
    });
    this.index = i;
  }
  updateTraining() {
    console.log(this.trainingID);
console.log(this.idMember);
    this.trainingService
      .updateTraining(this.trainingID._id, this.idMember, this.updateForm.value)
      .subscribe(
        (res: any) => {
          Swal.fire({ title: "la session est bien modifié", icon: "success" });
          this.uploadLogo(res.training._id);
        },
        (error) => {
          Swal.fire({ title: "oups il ya un probleme", icon: "error" });
        }
      );
  }
  deleteTraining(i, id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.trainingService.deleteTraining(id).subscribe((res: any) => {
          this.trainings.splice(i, 1);
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  uploadLogo(id) {
    this.data = new FormData();
    this.data.append("image", this.file, this.file.name);
    this.trainingService
      .uplodLogoTraining(id, this.data)
      .subscribe((res: any) => {});
  }
  logout() {
    Swal.fire({
      title: "etes vous sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui !",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        this.router.navigate(["/"]);
        Swal.fire("Deconnecté!", "success");
      } else {
        Swal.fire({ title: "oups ! il ya un probléme ", icon: "error" });
      }
    });
  }
}
