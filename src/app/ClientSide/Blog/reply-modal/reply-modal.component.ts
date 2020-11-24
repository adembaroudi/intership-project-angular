import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommentService } from "src/app/services/comment.service";
import { DatePipe } from "@angular/common";


@Component({
  selector: "app-reply-modal",
  templateUrl: "./reply-modal.component.html",
  styleUrls: ["./reply-modal.component.css"],
})
export class ReplyModalComponent implements OnInit {
  replyForm: FormGroup;
  now = Date.now();
  constructor(
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      name: new FormControl(""),
      date: new FormControl(this.now),
      contenue: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  addReplies() {
      const id = this.commentService.commentId;
      this.commentService.replyComment(id, this.replyForm.value).subscribe((res: any) => {
          console.log(res);
        });
  }
}
