import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/User';
import { MemberService } from 'src/app/services/member.service';
import { TrainingService } from 'src/app/services/training.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {
trainingForm : FormGroup;
niveau = ["Begginer","Intermediate"," Advanced"];
category= ["Web_Development","Data_Science","AI"]
members = []
file : File
data : FormData;
user : User
id ;
  constructor(private trainingService : TrainingService , private memberService : MemberService , private router : Router) { }

  ngOnInit(): void {
    this.trainingForm =new  FormGroup({
      prix : new FormControl('', Validators.required),
      title : new FormControl('' , Validators.required),
      Description: new FormControl('',Validators.required),
      nbParticipants: new FormControl('', Validators.required),
      nbHeuresD: new FormControl('' , Validators.required),
      nbHeuresND: new FormControl('' , Validators.required),
      level : new FormControl('' , Validators.required),
      picture : new FormControl('',Validators.required),
      member : new FormControl('' , Validators.required),
      TrainingCategory : new FormControl('' , Validators.required)
    });
    this.memberService.getAllMembers().subscribe((res:any)=>{   
      this.members = res
    })
  }
  onchange(selectedValue) {
    console.log(selectedValue);
    this.trainingForm.controls["level"].setValue(selectedValue);
  }
  onchangeCategory(selectedValue) {
    console.log(selectedValue);
    this.trainingForm.controls["TrainingCategory"].setValue(selectedValue);
  }
  onchangeMember(selectedValue) {
    console.log(selectedValue);
    this.trainingForm.controls["member"].setValue(selectedValue);
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
addTraining(){
  this.memberService.getAllMembers().subscribe((res:any)=>{
   this.members = res ; 
   this.members.map((e)=>{
     this.memberService.getMemberById(e._id).subscribe((res:any)=>{
       console.log(res._id);
       this.trainingService.createTraining(res._id , this.trainingForm.value).subscribe((response : any)=>{
         this.uploadLogoTraining(response.training._id)
       })
     })

   })
  })
        
}
  uploadLogoTraining(id){
    this.data = new FormData();
    this.data.append("image", this.file , this.file.name);
    this.trainingService.uplodLogoTraining(id ,this. data).subscribe((res:any)=>{
    })
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout !'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('adminToken');
    this.router.navigate(['/']);
        Swal.fire(
          'Deconnected!',
          'success'
        )
      }
    })
 
  }
}
