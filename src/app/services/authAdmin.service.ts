import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class authAdminService {

 
  BaseUrl = environment.baseuri;



  constructor(private http: HttpClient) {
   
   }
  registerAdmin(regAdmin){
    const url = `${this.BaseUrl}/auth/admin`;
    return this.http.post(url , regAdmin);  
  }
  loginAdmin(data){
    const url = `${this.BaseUrl}/auth/login`;
    return this.http.post(url, data);
  }

}
