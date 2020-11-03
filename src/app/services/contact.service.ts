import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ContactService {
  BaseUrl = environment.baseuri;

  constructor(private http: HttpClient) {}

  sendMessage(message) {
    const url = `${this.BaseUrl}/contact/Contact`;
    return this.http.post(url, message);
  }
  getMessagesList() {
    const url = `${this.BaseUrl}/contact/Contact`;
    return this.http.get(url);
  }
  getMessage(id) {
    const url = `${this.BaseUrl}/contact/Contact/${id}`;
    return this.http.get(url);
  }
  putMessage(id, message) {
    const url = `${this.BaseUrl}/contact/Contact/${id}`;
    return this.http.put(url, message);
  }
  deleteMessage(id) {
    const url = `${this.BaseUrl}/contact/Contact/${id}`;
    return this.http.delete(url);
  }
}
