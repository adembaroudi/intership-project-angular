import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoteModalComponent } from 'src/app/ClientSide/Trainings/vote-modal/vote-modal.component';
import { authAdminService } from 'src/app/services/authAdmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup
  constructor(private authService : authAdminService , private router : Router) { }

  ngOnInit(): void {
  this.loginForm = new FormGroup({
    email : new FormControl ('' , Validators.required),
    password : new FormControl ('' , Validators.required)
  });
  }
  loginAdmin(){
    this.authService.loginAdmin(this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem("adminToken", res.admin);
      this.router.navigateByUrl('/acceuil') 
      Swal.fire({title:"logged" , icon:"success"})
    },error=>{
      Swal.fire({title:"please check your email addres or password again"})
    })
  }

}
