import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartenairesService {
  BaseUrl = environment.baseuri;
  constructor(private http: HttpClient) { }
  getAllPartenaires(){
    const url = `${this.BaseUrl}/partenaires/getall`;
    return this.http.get(url);;
  }
  getPartenaire(id){
    const url = `${this.BaseUrl}/partenaires/getPartenaire/${id}`;
    return this.http.get(url);;
  }
}
