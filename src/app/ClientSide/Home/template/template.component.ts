import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { Blog } from "../../../entities/blog";
import { BlogService } from "../../../services/blog.service";
import { User } from "../../../entities/user";
import { UserService } from "../../../services/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from "../../../services/contact.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  blogs: any;
  loading:boolean;
  test :[];

  users: User[];
  constructor(private blogService: BlogService,private userService: UserService,private contactService: ContactService,
    private router: Router) { }

    contactForm = new FormGroup({  
      name : new FormControl('' , [Validators.required] ),
      subject : new FormControl('' , [Validators.required] ),  
      email : new FormControl('' , [Validators.required]),  
      contenuMessage : new FormControl('' , [Validators.required])  
    }); 

  ngOnInit(): void {
    this.loading=true;
    this.blogService.getLatestBlog().subscribe((response:any)=>{
      this.blogService.onChangeBlogs.next(response)
      console.log(response);
      
      this.blogs = response ; 
   });;
      
    this.blogService.onChangeBlogs.subscribe((data:any)=>{
      console.log('dataaa',data);

        this.blogs = data;
        this.blogs.map(blog => {
          this.blogService.getIntroBlog(blog.id).subscribe((res: any) => {
            blog['subtitle'] = res.jsonString;
          });
        });
    });
  console.log('init blog');
  console.log(this.blogService.blogs);
  



  this.userService.getUsersList().subscribe((response:any)=>{
    console.log(response)
      this.users = response;
  });
  console.log('init user')
  }

  ajouterMessage(){
    this.contactService.sendMessage(this.contactForm.value).subscribe();
     console.log(this.contactForm.value);
   }

}
