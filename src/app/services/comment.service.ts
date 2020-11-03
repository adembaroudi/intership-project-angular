import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommentService {

  BaseUrl = environment.baseuri;

  comments : any;
  onChangeBlogs:BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.onChangeBlogs = new BehaviorSubject([])
   }
  postComment(id,data) {
    const url = `${this.BaseUrl}/comment/Comments/${id}`;
    return this.http.put(url,data);;
  }
  getAllComments(){
    const url = `${this.BaseUrl}/comment/Comments`;
    return this.http.get(url);;
  }
  getNbrComments(id){
    const url = `${this.BaseUrl}/comment/nbrComments/${id}`;
    return this.http.get(url);;
  }
  getCommentsByBlog(id){
    const url = `${this.BaseUrl}/comment/Comments/${id}`;
    return this.http.get(url);;
  }
  putComments(idBlog,data){
    const url = `${this.BaseUrl}/comment/putComments/${idBlog}`;
    return this.http.put(url,data);
  }
  deleteComments(id){
    const url = `${this.BaseUrl}/comment/Comments/${id}`;
    return this.http.delete(url); 
  }
  replyComment(id,data){
    const url = `${this.BaseUrl}/replycomment/repcomment/${id}`;
    return this.http.put(url,data);
  }
  getReplyByComment(id){
    const url = `${this.BaseUrl}/replycomment/getrepliesByComment/${id}`;
    return this.http.get(url);;
  }
  getNbrReplies(id){
    const url = `${this.BaseUrl}/replycomment/nbrReplies/${id}`;
    return this.http.get(url);;
  }


}
