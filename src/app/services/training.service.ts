import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TrainingService {

  BaseUrl = environment.baseuri;
  onChangeTrainings:BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onChangeTrainings = new BehaviorSubject([])
  }
  
    createTraining(id,training) {
      const url = `${this.BaseUrl}/training/Trainings/${id}`;
      return this.http.post(url,training);;
    }
  getTraining(id){
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.get(url);;
  }

  updateTraining(id: number, value: any) {
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.put(url,value);;
  }

  deleteTraining(id) {
    const url = `${this.BaseUrl}/training/Trainings/${id}`;
    return this.http.delete(url);;
  }

  getTrainingsList() {
    const url = `${this.BaseUrl}/training/Trainings`;
    return this.http.get(url);;
  }

//   getIntroDesc(id: number){
//     return this.http.get(`${this.baseUrl}/intro/${id}`);
//  };

//  like(id: number){
//   return this.http.get(`${this.baseUrl}/like/${id}`);
//  };

}
