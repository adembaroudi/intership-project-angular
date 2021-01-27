import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Blog } from "src/app/entities/blog";
import { BlogService } from "src/app/services/blog.service";
import { CommentService } from "src/app/services/comment.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-blog",
  templateUrl: "./list-blog.component.html",
  styleUrls: ["./list-blog.component.css"],
})
export class ListBlogComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/blog/getBlogsLogo/";
  Search = "";
  blogs = [];
  index: number;
  updateForm: FormGroup;
  file: File;
data: FormData;

  constructor(private blogService: BlogService ,private commentService : CommentService, private router :Router) {}

  ngOnInit(): void {
    this.blogService.getBlogsList().subscribe((response: any) => {
      this.blogs = response;
    });
    this.updateForm = new FormGroup({
      Title: new FormControl(''),
      auteur: new FormControl(''),
      Contenue: new FormControl(''),
      image: new FormControl(''),
    });
    
  }
  modalOpened(i, blog ) { 
    console.log(i)
    console.log(blog);
    this.updateForm = new FormGroup({
      Title: new FormControl(blog.Title),
      auteur: new FormControl(blog.auteur),
      image: new FormControl(this.blogs[i].image),
      Contenue: new FormControl(blog.Contenue),
    });
    this.index = i;
  }
  updateBlog( id ) {
    console.log(id);
    
    // this.blogService
    //   .updateBlog(id, this.updateForm.value)
    //   .subscribe((res: any) => {
    //     Swal.fire({title:"le blog est bien modifié" , icon:"success"})
    //       this.uploadLogo(res._id);
    //     },error=>{
    //         Swal.fire({title:`${error}`, icon:"error"})
    //       });
  }
  deleteBlog(i, id) {
    Swal.fire({
      title: 'etes vous sure?',
      text: `de supprimer ${this.blogs[i].Title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe((res: any) => {
          this.blogs.splice(i, 1);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        },error=>{
          Swal.fire(
            'error!',
            'erreur.',
            'error'
          )
        });
      }
    })
    
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  uploadLogo(id){
    this.data = new FormData();
    this.data.append("image", this.file , this.file.name);
    this.blogService.uploadLogo(id ,this. data).subscribe((res:any)=>{},error=>{Swal.fire({title:`${error}`,icon:"error"})})
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
