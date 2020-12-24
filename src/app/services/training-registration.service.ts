import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class TrainingRegistrationService {
  trainingId;
  BaseUrl = environment.baseuri;
  constructor(private http: HttpClient) {}

  Register(id, reg) {
    const url = `${this.BaseUrl}/auth/trainingregister/${id}`;
    return this.http.post(url, reg);
  }
  RegisterWitoutAffectation(reg) {
    const url = `${this.BaseUrl}/auth/trainingregister`;
    return this.http.post(url, reg);
  }
}
