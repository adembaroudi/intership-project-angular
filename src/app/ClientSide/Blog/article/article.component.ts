import { Component, OnInit } from "@angular/core";
import { BlogService } from "../../../services/blog.service";
import { CommentService } from "../../../services/comment.service";
import { Blog } from "../../../entities/blog";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { environment } from "src/environments/environment";
import { ReplyModalComponent } from "../reply-modal/reply-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/blog/getBlogsLogo/";
  nbreplies = [];
  nbrs: number;
  id: number;
  blog: Blog;
  commentForm: FormGroup;
  updateForm: FormGroup;
  articles = [];
  commenteret = [];
  replys = [];
  pipe = new DatePipe("en-US");
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, "yyyy-mm-dd");
  index;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    public dialog: MatDialog,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
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

    this.getBlogById(this.id);
    this.nbrComments(this.id);
    this.getCommentsByBlog(this.id);
    this.getRecentArticles();
  }

  getBlogById(id) {
    this.blogService.getBlog(id).subscribe(
      (data: any) => {
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
      this.commenteret.map((e) => {
        this.commentService.getReplyByComment(e._id).subscribe((res: any) => {
          this.replys = res.replies;
        });
        this.commentService.getNbrReplies(e._id).subscribe((res: any) => {
          this.nbreplies.push(res) ;
        });
      });
    });
  }

  articleDetails(id) {
    this.router.navigate(["article", id]);
  }
  nbrComments(id) {
    this.commentService.getNbrComments(id).subscribe((res: any) => {
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
      .subscribe((res: any) => {});
  }
  deleteComment(id, i) {
    this.commentService.deleteComments(id).subscribe((res: any) => {
      this.commenteret.splice(i, 1);
    });
  }
  replyDetails(idblog, idcomment) {
    this.router.navigate(["/reply", idblog, idcomment]);
  }
  openModal(idcomment) {
    const dialogRef = this.dialog.open(ReplyModalComponent);
    this.commentService.getCommentsById(idcomment).subscribe((res : any)=>{})
    dialogRef.afterClosed().subscribe((res) => {
      this.commentService.getReplyByComment(idcomment).subscribe((res:any)=>{
        this.replys = res.replies      
      })
      // console.log(`result : ${res}`);
    });
  }
}
