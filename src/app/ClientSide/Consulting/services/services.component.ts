import { Component, OnInit } from '@angular/core';
import { PartenairesService } from 'src/app/services/partenaires.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  partenaires = []
  pictureBaseUrl: String = environment.baseuri + "/partenaires/getPartenaireLogo/";
  constructor(private partenairesService : PartenairesService) { }

  ngOnInit(): void {
    this.partenairesService.getAllPartenaires().subscribe((res:any)=>{
      this.partenaires = res
      console.log(this.partenaires);
      
    })
  }

}
