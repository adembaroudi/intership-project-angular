import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  BaseUrl = environment.baseuri;
  UserId;
  constructor( private http : HttpClient) { }
  addMember( data) {
    const url = `${this.BaseUrl}/user/Users`;
    return this.http.post(url,data);;
  }
  getAllMembers(){
    const url = `${this.BaseUrl}/user/Users`;
    return this.http.get(url);;
  }
  getMemberById(id){
    const url = `${this.BaseUrl}/user/Users/${id}`;
    return this.http.get(url);;
  }
  deleteMember(id){
    const url = `${this.BaseUrl}/user/Users/${id}`;
    return this.http.delete(url);
  }
  uploadLogoMember(id , file){
    const url = `${this.BaseUrl}/user/Users/file/${id}`;
    return this.http.put(url , file);
  }
}
