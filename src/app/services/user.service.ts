import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  BaseUrl = environment.baseuri;
  constructor(private http: HttpClient) { }

  createUser(user) {
    const url = `${this.BaseUrl}/user/Users`;
    return this.http.post(url,user);
  }
  getUser(id){
    const url = `${this.BaseUrl}/user/Users/${id}`;
    return this.http.get(url);
  }


  updateUser(id: number, value: any) {
    const url = `${this.BaseUrl}/user/Users/${id}`;
    return this.http.put(url,value);
  }

  deleteUser(id: number) {
    const url = `${this.BaseUrl}/user/Users/${id}`;
    return this.http.delete(url);
  }

  getUsersList() {
    const url = `${this.BaseUrl}/user/Users`;
    return this.http.get(url);
  }
  uploadPicture(data){
    const url = `${this.BaseUrl}/user/Users/file`;
    return this.http.post(url,data)
  }
  getPicture(id){
    const url = `${this.BaseUrl}/user/Users/${id}`;
    return this.http.get(url)
  }
}
