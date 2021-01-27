import { Component, OnInit } from "@angular/core";
import { TrainingRegistration } from "../../../entities/trainingRegistration";
import { TrainingRegistrationService } from "../../../services/training-registration.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Training } from "src/app/entities/training";
import { TrainingService } from "src/app/services/training.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: "app-training-registration",
  templateUrl: "./training-registration.component.html",
  styleUrls: ["./training-registration.component.css"],
})
export class TrainingRegistrationComponent implements OnInit {
  programmes = [ "FullStack Web(Dans la peau d’un développeur Web)",
  "Angular/ReactJS",
  "NodeJs/JavaJee/Spring",
  "FullStack Web(Dans la peau d’un ingenieur DevOps)",
  "Business Intelligence",
  "DATA SCIENCE/DEEP LEARNING",]
  regs = [];
  trainings = [];
  training: Training;
  registrationForm: FormGroup;
  train: any;
  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private registrationServ: TrainingRegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      numTel: new FormControl("", [Validators.required]),
      diplome: new FormControl("", [Validators.required]),
      online: new FormControl("", [Validators.required]),
      typePresence: new FormControl("", [Validators.required]),
      programme : new FormControl("" , [Validators.required])
      //  training : new FormControl(training);
    });
    this.trainingService.getTrainingsList().subscribe((res: any) => {
      this.trainings = res;
      this.trainings.map((e) => {
        this.trainingService.getTraining(e._id).subscribe((res: any) => {
          this.train = res._id;
        });
      });
    });
  }
  register() {
    const id = this.route.snapshot.params["id"];
    if (!id) {
      this.registrationServ
        .RegisterWitoutAffectation(this.registrationForm.value)
        .subscribe((response : any  )=>{
          Swal.fire({title:"merci pour votre inscription",icon:"success"})
          
           this.router.navigateByUrl("/template");
        } , error =>{
          Swal.fire({title:"vous etes deja inscrits",icon:"error"})
        }
        );
    } else {
      this.registrationServ
        .Register(id, this.registrationForm.value)
        .subscribe((res)=>{
          Swal.fire({title:"merci pour votre inscription",icon:"success"})
          this.router.navigateByUrl("/trainings");
        }, error =>{
          Swal.fire({title:"vous etes deja inscrits",icon:"error"})
        });

    }
  }
  onchange(selectedValue) {
    this.registrationForm.controls["programme"].setValue(selectedValue);
  }
}
