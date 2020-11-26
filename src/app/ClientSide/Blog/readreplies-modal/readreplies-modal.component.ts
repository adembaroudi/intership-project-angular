import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-readreplies-modal',
  templateUrl: './readreplies-modal.component.html',
  styleUrls: ['./readreplies-modal.component.css']
})
export class ReadrepliesModalComponent implements OnInit {
replys=[]
nbreplies = []
  constructor( private commentService : CommentService) { }

  ngOnInit(): void {
    const id = this.commentService.commentId
    this.commentService.getReplyByComment(id).subscribe((res: any) => {
      this.replys = res.replies;
      // this.commentService.getNbrReplies(id).subscribe((res: any) => {
      //   this.nbreplies.push(res);
      //   if(this.nbreplies.find((n)=>n==0)){
      //     console.log("there is no comment yet")
   
      //   }
      // });
    });
   
  }

}
