import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import * as jwt_decode from "jwt-decode";
@Injectable()
export class TrainingService {
  BaseUrl = environment.baseuri;
  onChangeTrainings: BehaviorSubject<any>;
  trainingId ;
  connectedUser : any ; 
  validtoken : any
  constructor(private http: HttpClient) {
    this.onChangeTrainings = new BehaviorSubject([]);
    this.connectedUser = this.getConnectedUser();
    this.validtoken = this.validToken()
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
  getAllVoteurs() {
    const url = `${this.BaseUrl}/voteur/Voteurs`;
    return this.http.get(url);
  }
  getVoteur(id) {
    const url = `${this.BaseUrl}/voteur/Voteurs/${id}`;
    return this.http.get(url);
  }
  getintroDesc(id){
    const url = `${this.BaseUrl}/training/intro/${id}`;
    return this.http.get(url);
  }
  saveToken(token) {
    localStorage.setItem( 'token', token);
    this.connectedUser = this.getConnectedUser();
  }
  getConnectedUser() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return jwt_decode(token).data;
    }
  }
  validToken() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.connectedUser = {};
    return false;
  }
}
