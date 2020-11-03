import { Component, OnInit } from "@angular/core";
import { BlogService } from "../../../services/blog.service";
import { CommentService } from "../../../services/comment.service";
import { CommentReply } from "../../../entities/commentReply";
import { Blog } from "../../../entities/blog";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormControlName } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  pictureBaseUrl : String = environment.baseuri + "/blog/getBlogsLogo/";
  nbreplies : number; 
  commenteret = [];
  nbrs: number;
  id: number;
  blog: Blog;
  articles = [];
  commentForm: FormGroup;
  comments: [];
  replys: any;
  updateForm: FormGroup;
  pipe = new DatePipe("en-US");
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, "yyyy-mm-dd");
  index: any;
  replyForm : FormGroup
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    //this.blog = new Blog();

    this.id = this.route.snapshot.params["id"];

    this.commentForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      date: new FormControl(this.myFormattedDate),
      contenue: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      blog: new FormControl(this.blog),
    });
    this.updateForm = new FormGroup({
      name: new FormControl(this.commentForm.value.name),
      contenue: new FormControl(this.commentForm.value.contenue),
      email: new FormControl(this.commentForm.value.email),
    });
    this.replyForm = new FormGroup({
      name : new FormControl(''),
      date : new FormControl(''),
      contenue : new FormControl(''),
      email : new FormControl('')
    })
    this.getBlogById(this.id);
    this.nbrComments(this.id);
    this.getCommentsByBlog(this.id);
    this.getRecentArticles();
  }

  getBlogById(id) {
    this.blogService.getBlog(id).subscribe(
      (data: any) => {
        console.log(data);
        this.blog = data;
      },
      (error) => console.log(error)
    );
  }
  getRecentArticles() {
   
    this.blogService.getLatestArticles().subscribe((response: any) => {
 
      this.articles = response;
 
      
    });
  }

  ajouterComment(id) {
    this.commentService.postComment(id, this.commentForm.value).subscribe();

  }
  getCommentsByBlog(id) {
    this.commentService.getCommentsByBlog(id).subscribe((res: any) => {
      this.commenteret = res.comment;
      this.getReplies();
      this.nbrReplies();
    });
  }
  addReplies(id){
   this.commentService.replyComment(id,this.replyForm.value).subscribe();
  }
  getReplies() {
    this.commenteret.map((e) => {
      this.commentService
        .getReplyByComment(e._id)
        .subscribe((response: any) => {
          console.log(response);
          this.replys = response.replies;
          console.log(this.replys);
        });
    });
  }
  nbrReplies(){
    this.commenteret.map((e=>{
      this.commentService.getNbrReplies(e._id).subscribe((res:any)=>{
        this.nbreplies = res
      });
    }));
  };
  articleDetails(id: number) {
    this.router.navigate(["article", id]);
  }
  nbrComments(id) {
    this.commentService.getNbrComments(id).subscribe((res: any) => {
      console.log(res);
      this.nbrs = res;
    });
  }
  modalOpened(c) {
    this.updateForm = new FormGroup({
      name: new FormControl(c.name),

      contenue: new FormControl(c.contenue),
      email: new FormControl(c.email),
    });
  }
  updateComment(id) {
    this.commentService
      .putComments(id, this.updateForm.value)
      .subscribe((res: any) => {
        console.log(this.updateForm.value);

        console.log(res);
      });
  }
  deleteComment(id,i) {
    this.commentService.deleteComments(id).subscribe((res: any) => {
      console.log(res);
      this.commenteret.splice(i,1)
    });
  }
}
