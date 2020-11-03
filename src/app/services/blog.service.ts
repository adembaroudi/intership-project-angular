import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BlogService {

 
  BaseUrl = environment.baseuri;

  blogs : any;
  onChangeBlogs:BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.onChangeBlogs = new BehaviorSubject([])
   }
   createBlog( data) {
     const url = `${this.BaseUrl}/blog/Blogs`;
     return this.http.post(url,data);;
   }
   getBlogsList(){
    const url = `${this.BaseUrl}/blog/Blogs`;
    return this.http.get(url);;
  }
  getBlog(id){
    const url = `${this.BaseUrl}/blog/Blogs/${id}`;
    return this.http.get(url);;
  }
  updateBlog(id,data) {
    const url = `${this.BaseUrl}/blog/Blogs/${id}`;
    return this.http.put(url,data);;
  }

  deleteBlog(id) {
    const url = `${this.BaseUrl}/blog/Blogs/${id}`;
    return this.http.delete(url);;
  }

  getLatestBlog() {
    const url = `${this.BaseUrl}/blog/latestBlogs`;
    return this.http.get(url);;
     
  }

  getIntroBlog(id){
    const url = `${this.BaseUrl}/blog/Blogs/intro/${id}`;
    return this.http.get(url);;
  };
  
  getLatestArticles() {
    return this.http.get(`${this.BaseUrl}/blog/recentArticle`)
     
  }
  uploadLogo(id,file){
    const url = `${this.BaseUrl}/blog/Blogs/file/${id}`;
    return this.http.put(url,file)
  }

}
