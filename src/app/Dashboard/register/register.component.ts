import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { authAdminService } from 'src/app/services/authAdmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
fieldTextType: boolean;
  constructor( private authService : authAdminService , private router : Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name : new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ]),
    }); 
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  registerAdmin(){
    if(this.registerForm.value.name == "abir"){
      this.authService.registerAdmin(this.registerForm.value).subscribe((res:any)=>{
        Swal.fire({title:"inscription aboutie avec succés" , icon:"success"})
        this.router.navigateByUrl("/login");

      },error=>{
        Swal.fire({title : "l'adresse email est déjà utulisé" , icon : "error"})
      })
    }
    else{
      Swal.fire({title : "vous n'etes administrateur !" , icon : "error"})
      this.router.navigateByUrl("/");
    }
  }
}
