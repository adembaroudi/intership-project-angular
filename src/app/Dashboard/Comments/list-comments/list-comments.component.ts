import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { comment } from "src/app/entities/comment";
import { CommentReply } from "src/app/entities/commentReply";

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/blog/getBlogsLogo/";
comments = []
replys = []
Search = ""
Comment : comment;
id ; 
index
replyComment : CommentReply
idrep;
  constructor(private commentService : CommentService , private  router : Router) { }

  ngOnInit(): void {
    this.commentService.getAllComments().subscribe((res:any)=>{
      this.comments = res
    })

  }
  modalOpened(id ,i) {
    // const id = this.commentService.commentId
    this.commentService.getReplyByComment(id).subscribe((res: any) => {
      this.replys = res.replies;
    });
  }
  deleteComments(i, id) {
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
        this.commentService.deleteComments(id).subscribe((res: any) => {
          this.comments.splice(i, 1);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  deleteReplies(j, idrep) {
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
        this.commentService.deleteReplies(idrep).subscribe((res: any) => {
          this.replys.splice(j, 1);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
