import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Blog } from "src/app/entities/blog";
import { BlogService } from "src/app/services/blog.service";
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
  blog: Blog;
  id;
  updateForm: FormGroup;
  file: File;
data: FormData;
  constructor(private blogService: BlogService , private router :Router) {}

  ngOnInit(): void {
    this.blogService.getBlogsList().subscribe((response: any) => {
      this.blogs = response;
      console.log(this.blogs);
      
    });
    this.updateForm = new FormGroup({
      Title: new FormControl(''),
      auteur: new FormControl(''),
      Contenue: new FormControl(''),
      image: new FormControl(''),
    });
    
  }
  updateBlog(id) {
    this.blogService
      .updateBlog(id, this.updateForm.value)
      .subscribe((res: any) => {
        this.uploadLogo(res._id);
        Swal.fire({title:"le blog est bien modifié" , icon:"success"})
      },error=>{
        Swal.fire({title:"oups il ya un probleme" , icon:"error"})
      });
  }
  modalOpened(i, blog) {
    this.updateForm = new FormGroup({
      Title: new FormControl(blog.Title),
      auteur: new FormControl(blog.auteur),
      Contenue: new FormControl(blog.Contenue),
      image: new FormControl(this.blogs[i].image),
    });
    this.index = i;
  }
  deleteBlog(i, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe((res: any) => {
          this.blogs.splice(i, 1);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
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
    this.blogService.uploadLogo(id ,this. data).subscribe((res:any)=>{})
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
