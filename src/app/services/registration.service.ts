import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class RegistrationService {
  BaseUrl = environment.baseuri;

  constructor(private http: HttpClient) {}

  Register(reg) {
    const url = `${this.BaseUrl}/auth/serviceregistration`;
    return this.http.post(url, reg);
  }
  uploadCv(id ,file){
    const url = `${this.BaseUrl}/auth/file/${id}`;
    return this.http.put(url, file);
  }
  downloadFile(): any {
		return this.http.get('http://localhost:3000/upload/download', {responseType: 'blob'});
  }
}
