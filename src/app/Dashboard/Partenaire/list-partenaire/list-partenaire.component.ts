import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartenairesService } from 'src/app/services/partenaires.service';
import { Partenaire } from "src/app/entities/partenaire";
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-partenaire',
  templateUrl: './list-partenaire.component.html',
  styleUrls: ['./list-partenaire.component.css']
})
export class ListPartenaireComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/partenaires/getPartenaireLogo/";
  Search : ""
updateForm : FormGroup;
partenaires = [];
file : File;
data : FormData;
index;
Partenaire : Partenaire;
id;
  constructor(private partenaireService: PartenairesService ,private router  : Router ) { }
  ngOnInit(): void {
    this.partenaireService.getAllPartenaires().subscribe((res:any)=>{
      this.partenaires=res
    })
    this.updateForm= new FormGroup({
      nomPartenaire : new FormControl('', Validators.required),
      Logo : new FormControl('')
    })
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  uploadLogo(id) {
    this.data = new FormData();
    this.data.append("file", this.file, this.file.name);
    this.partenaireService
      .uploadLogo(id, this.data)
      .subscribe((res: any) => {});
  }
  modalOpened(i, partenaire) {
    this.updateForm = new FormGroup({
      nomPartenaire: new FormControl(partenaire.nomPartenaire),
      Logo: new FormControl(this.partenaires[i].Logo),
    });
    this.index = i;
  }
  updatePartenaire(id) {
    this.partenaireService
      .updatePartenaire(id, this.updateForm.value)
      .subscribe((res: any) => {
        console.log(res);
        
        this.uploadLogo(res.part._id);
        Swal.fire({title:"le partenaire est bien modifié" , icon:"success"})
      },error=>{
        Swal.fire({title:"oups il ya un probleme" , icon:"error"})
      });
  }
  deletePartenaire(i, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.partenaireService.deletePartenaire(id).subscribe((res: any) => {
          this.partenaires.splice(i, 1);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout !'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('adminToken');
    this.router.navigate(['/']);
        Swal.fire(
          'Deconnected!',
          'success'
        )
      }
    })
 
  }
}
