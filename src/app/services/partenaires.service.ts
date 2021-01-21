import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartenairesService {
  BaseUrl = environment.baseuri;
  constructor(private http: HttpClient) { }
  AjoutPartenaire(data){
    const url = `${this.BaseUrl}/partenaires/addPartenaire`;
    return this.http.post(url,data)
  }
  getAllPartenaires(){
    const url = `${this.BaseUrl}/partenaires/getall`;
    return this.http.get(url);;
  }
  getPartenaire(id){
    const url = `${this.BaseUrl}/partenaires/getPartenaire/${id}`;
    return this.http.get(url);;
  }
  updatePartenaire(id , data){
    const url = `${this.BaseUrl}/partenaires/updatepartenaire/${id}`;
    return this.http.put(url , data)
  }
  deletePartenaire(id){
    const  url = `${this.BaseUrl}/partenaires/deleteone/${id}`;
    return this.http.delete(url)
  }
  uploadLogo(id,file){
    const url = `${this.BaseUrl}/partenaires/file/${id}`;
    return this.http.put(url,file)
  }
}
