import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommentService } from "src/app/services/comment.service";
import { DatePipe } from "@angular/common";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: "app-reply-modal",
  templateUrl: "./reply-modal.component.html",
  styleUrls: ["./reply-modal.component.css"],
})
export class ReplyModalComponent implements OnInit {
  replyForm: FormGroup;
  now = Date.now();
  constructor(
    private commentService: CommentService,public dialogRef : MatDialogRef<ReplyModalComponent>
  ) {}

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      name: new FormControl("",Validators.required),
      date: new FormControl(this.now ),
      contenue: new FormControl("",Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  addReplies() {
      const id = this.commentService.commentId;
      this.commentService.replyComment(id, this.replyForm.value).subscribe((res: any) => {
          this.dialogRef.close() 
        });
  }
}
