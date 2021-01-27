import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PartenairesService } from "src/app/services/partenaires.service";
import { Partenaire } from "src/app/entities/partenaire";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-list-partenaire",
  templateUrl: "./list-partenaire.component.html",
  styleUrls: ["./list-partenaire.component.css"],
})
export class ListPartenaireComponent implements OnInit {
  pictureBaseUrl: String =
    environment.baseuri + "/partenaires/getPartenaireLogo/";
  Search: "";
  updateForm: FormGroup;
  partenaires = [];
  file: File;
  data: FormData;
  index;
  constructor(
    private partenaireService: PartenairesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.partenaireService.getAllPartenaires().subscribe((res: any) => {
      this.partenaires = res;
    });
    this.updateForm = new FormGroup({
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
    this.partenaireService.uploadLogo(id, this.data).subscribe(
      (res: any) => {},
      (error) => {
        Swal.fire({ title: "l'upload image n'est pas abouti", icon: "error" });
      }
    );
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
      .subscribe(
        (res: any) => {
          this.uploadLogo(res.part._id);
          Swal.fire({
            title: "le partenaire est bien modifié",
            icon: "success",
          });
        },
        (error) => {
          Swal.fire({ title: "oups il ya un probleme", icon: "error" });
        }
      );
  }
  deletePartenaire(i, id) {
    Swal.fire({
      title: "supprimer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui",
    }).then((result) => {
      if (result.isConfirmed) {
        this.partenaireService.deletePartenaire(id).subscribe((res: any) => {
          this.partenaires.splice(i, 1);
          Swal.fire("supprimé !", "success");
        },error=>{Swal.fire({title:"oups ! il ya un probléme" , icon:"error"})});
      }
    });
  }
  logout() {
    Swal.fire({
      title: "etes vous sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        this.router.navigate(["/"]);
        Swal.fire("Deconnecté!", "success");
      }
      else{
        Swal.fire({title:"oups ! il ya un probléme" , icon:"error"})
      }
    });
  }
}
