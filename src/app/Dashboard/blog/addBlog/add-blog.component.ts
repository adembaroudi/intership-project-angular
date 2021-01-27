import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import Swal from 'sweetalert2';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
admin;
blogForm : FormGroup ;
pipe = new DatePipe("en-US");
now = Date.now();
myFormattedDate = this.pipe.transform(this.now, "yyyy-mm-dd");
file: File;
data: FormData;
// decode = jwt_decode(localStorage.getItem("adminToken"))
  constructor(private blogService : BlogService , private router : Router) { }

  ngOnInit(): void {
    this.blogForm = new FormGroup({
      Title : new FormControl('' , Validators.required),
      // date : new FormControl(this.myFormattedDate),
      auteur : new FormControl('', Validators.required),
      Contenue: new FormControl('' , Validators.required),
      image : new FormControl('' ,  Validators.required)
    })
    // this.admin = this.decode.email   
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  addBlog(){
  this.blogService.createBlog(this.blogForm.value).subscribe((res:any)=>{
    this.uploadLogo(res.blog._id)
    this.router.navigateByUrl('/listblog')
    Swal.fire({title:"le blog est bien ajouté", icon:"success"})
  },error=>{
    Swal.fire({title:"ouups ! il ya un probléme" , icon:"error"})
  })
}
uploadLogo(id){
    this.data = new FormData();
    this.data.append("image", this.file , this.file.name);
    this.blogService.uploadLogo(id ,this. data).subscribe((res:any)=>{})
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
    }
    else{
      Swal.fire({title:"oups ! il ya un probléme " , icon:"error"})
    }
  })
}
}
