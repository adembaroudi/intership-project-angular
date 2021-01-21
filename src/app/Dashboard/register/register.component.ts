import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { authAdminService } from 'src/app/services/authAdmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  constructor( private authService : authAdminService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name : new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  registerAdmin(){
    this.authService.registerAdmin(this.registerForm.value).subscribe((res:any)=>{
      Swal.fire({title:"you are registred" , icon:"success"})
    },error=>{
      Swal.fire({title : "email in use" , icon : "error"})
    })
  }
}
