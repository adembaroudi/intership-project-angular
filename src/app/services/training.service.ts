import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable()
export class TrainingService {
  BaseUrl = environment.baseuri;
  onChangeTrainings: BehaviorSubject<any>;
  trainingId ;
  constructor(private http: HttpClient) {
    this.onChangeTrainings = new BehaviorSubject([]);
  }

  createTraining(id, training) {
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.post(url, training);
  }
  getTraining(id) {
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.get(url);
  }
  updateTraining(id: number, value: any) {
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.put(url, value);
  }

  deleteTraining(id) {
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.delete(url);
  }

  getTrainingsList() {
    const url = `${this.BaseUrl}/training/Trainings`;
    return this.http.get(url);
  }
  registerForVote(data) {
    const url = `${this.BaseUrl}/voteur/registerforvote`;
    return this.http.post(url, data);
  }
  loginForVote(data) {
    const url = `${this.BaseUrl}/voteur/loginforvote`;
    return this.http.post(url, data);
  }
  vote(id, idvot, value) {
    const url = `${this.BaseUrl}/voteur/vote/${id}/${idvot}`;
    return this.http.put(url, value);
  }
  getintroDesc(id){
    const url = `${this.BaseUrl}/training/intro/${id}`;
    return this.http.get(url);
  }
  uplodLogoTraining(id , file){
    const url = `${this.BaseUrl}/training/Trainings/file/${id}`;
    return this.http.put(url , file)
  }

}
