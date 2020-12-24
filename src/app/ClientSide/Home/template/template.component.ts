import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Blog } from "../../../entities/blog";
import { BlogService } from "../../../services/blog.service";
import { User } from "../../../entities/user";
import { UserService } from "../../../services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContactService } from "../../../services/contact.service";
import { environment } from 'src/environments/environment';
import { TrainingRegistrationService } from "src/app/services/training-registration.service";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"],
})
export class TemplateComponent implements OnInit {
  UserPicture : String = environment.baseuri + "/user/getUserLogo/";
  pictureBaseUrl: String = environment.baseuri + "/blog/getBlogsLogo/";
 
  intros = []
  recent = []
  blogs= [];
  loading: boolean;
  test: [];

  users: [];
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private contactService: ContactService,
    private router: Router,
    private registrationServ: TrainingRegistrationService
  ) {}

  contactForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    subject: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    contenuMessage: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
    this.blogService.getBlogsList().subscribe((response: any) => {
      this.blogs = response;
      
      this.blogs.map((e) => {
        this.blogService.getIntroBlog(e._id).subscribe((res: any) => {
          this.intros.push(res.intro);
        });
      });
    });
    this.userService.getUsersList().subscribe((response: any) => {
      console.log(response);
      this.users = response;
      console.log(this.users);
      
    });
    this.getRecentBlog() 
  }
  // registrationForm = new FormGroup({  
  //   firstname : new FormControl('' , [Validators.required] ),
  //   lastname : new FormControl('' , [Validators.required] ),  
  //   email : new FormControl('' , [Validators.required , Validators.email]),  
  //   numTel : new FormControl('' , [Validators.required]),
  //   diplome : new FormControl('' , [Validators.required] ),  
  //   online : new FormControl('' , [Validators.required]),  
  //   resterInforme : new FormControl('' , [Validators.required])
  // }); 
  // register(){
  //   this.registrationServ.RegisterWitoutAffectation(this.registrationForm.value).subscribe();
  //  }

  ajouterMessage() {
    this.contactService.sendMessage(this.contactForm.value).subscribe();
    console.log(this.contactForm.value);
  }
  getRecentBlog() {
    this.loading = true;
    this.blogService.getLatestBlog().subscribe((res: any) => {
      this.blogService.onChangeBlogs.next(res);
      this.recent = res;
      console.log(this.recent);
      
    });
  }
  articleDetails(id: number) {
    this.router.navigate(["/article", id]);
  }
}
