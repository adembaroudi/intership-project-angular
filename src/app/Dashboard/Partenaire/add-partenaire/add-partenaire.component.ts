import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PartenairesService } from "src/app/services/partenaires.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-partenaire",
  templateUrl: "./add-partenaire.component.html",
  styleUrls: ["./add-partenaire.component.css"],
})
export class AddPartenaireComponent implements OnInit {
  file: File;
  data: FormData;
  constructor(private partenaireService: PartenairesService , private router : Router) {}
  partenaireForm: FormGroup;
  ngOnInit(): void {
    this.partenaireForm = new FormGroup({
      nomPartenaire: new FormControl("", Validators.required),
      Logo: new FormControl("", Validators.required),
    });
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
      .subscribe((res: any) => {},error=>{Swal.fire({title:"l'upload image n'est pas abouti"})});
  }
  addPartenaire() {
    this.partenaireService
      .AjoutPartenaire(this.partenaireForm.value)
      .subscribe((res: any) => {
        this.uploadLogo(res.added._id);
        this.router.navigateByUrl('/listpartenaire')
      },error=>{
        Swal.fire({title:"l'ajout partenaire n'est pas abouti"})
      });
  }
  logout() {
    Swal.fire({
      title: 'etes vous sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui !'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('adminToken');
    this.router.navigate(['/']);
        Swal.fire(
          'Deconnecté!',
          'success'
        )
      }else{
        Swal.fire({title:"oups ! il ya un probléme " , icon:"error"})
      }
    })
  }
}
