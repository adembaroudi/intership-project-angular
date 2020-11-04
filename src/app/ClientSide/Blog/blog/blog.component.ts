import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Blog } from "../../../entities/blog";
import { BlogService } from "../../../services/blog.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/blog/getBlogsLogo/";
  Search : ""
  id;
  intros = [];
  recent = [];
  blogs: [any];
  articles: Blog[];
  blog: Blog;
  loading: boolean;
  BlogForm: FormGroup;
  data: FormData;
  file: File;
  updateForm: FormGroup;
  index: number;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.BlogForm = new FormGroup({
      Title: new FormControl(""),
      date: new FormControl(Date.now()),
      auteur: new FormControl(""),
      Contenue: new FormControl(""),
      image: new FormControl(""),
    });
    this.updateForm = new FormGroup({
      Title: new FormControl(this.BlogForm.value.Title),
      date: new FormControl(this.BlogForm.value.date),
      auteur: new FormControl(this.BlogForm.value.auteur),
      Contenue: new FormControl(this.BlogForm.value.Contenue),
      image: new FormControl(this.BlogForm.value.image),
    });

    this.blogService.getBlogsList().subscribe((response: any) => {
      this.blogs = response;

      this.blogs.map((e) => {
        this.blogService.getIntroBlog(e._id).subscribe((res: any) => {
          this.intros.push(res.intro);
        });
      });
    });

    this.getRecentBlog();
  }
  createBlogs() {
    this.blogService.createBlog(this.BlogForm.value).subscribe((res: any) => {
      this.upload(res.blog._id);
    });
  }

  upload(id) {
    this.data = new FormData();
    this.data.append("image", this.file);
    this.blogService.uploadLogo(id, this.data).subscribe((res: any) => {});
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }

  updateBlog(id) {
    this.blogService
      .updateBlog(id, this.updateForm.value)
      .subscribe((res: any) => {
        this.upload(res._id);
      });
  }
  modalOpened(i, blog) {
    this.updateForm = new FormGroup({
      Title: new FormControl(blog.Title),
      date: new FormControl(blog.date),
      auteur: new FormControl(blog.auteur),
      Contenue: new FormControl(blog.Contenue),
      image: new FormControl(this.blogs[i].image),
    });
    this.index = i;
  }
  deleteBlog(i, id) {
    this.blogService.deleteBlog(id).subscribe((res: any) => {
      this.blogs.splice(i, 1);
    });
  }
  articleDetails(id: number) {
    this.router.navigate(["/article", id]);
  }
  getRecentBlog() {
    this.blogService.getLatestBlog().subscribe((res: any) => {
      this.recent = res;
      console.log(this.recent);
      
    });
  }
}
