import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
memberForm : FormGroup ; 
file : File;
data : FormData;
roole = ["Coach","Developpeur"];
  constructor(private memeberService: MemberService , private router : Router) { }

  ngOnInit(): void {
    this.memberForm = new FormGroup({
      Firstname: new FormControl('', Validators.required),
      Lastname: new FormControl('' , Validators.required),
      Datedenaissance: new FormControl('', Validators.required),
      numTel: new FormControl('' , Validators.required),
      email: new FormControl('' , Validators.required),
      password: new FormControl('' , Validators.required),
      img : new FormControl('' , Validators.required),
      role: new FormControl('' , Validators.required),
    })
  }
  onchange(selectedValue) {
    console.log(selectedValue);
    this.memberForm.controls["role"].setValue(selectedValue);
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  addMember(){
    this.memeberService.addMember(this.memberForm.value).subscribe((res:any)=>{
     this.uploadLogo(res.user._id)
    })
  }
  uploadLogo(id){
    this.data = new FormData();
    this.data.append("file", this.file , this.file.name);
    this.memeberService.uploadLogoMember(id ,this. data).subscribe((res:any)=>{})
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
