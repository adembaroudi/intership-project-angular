import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MemberService } from "src/app/services/member.service";
import { environment } from "src/environments/environment";
import { PageEvent } from "@angular/material/paginator";
import { User } from "src/app/entities/User";
import Swal from "sweetalert2";
import { Router, RouteReuseStrategy } from "@angular/router";

@Component({
  selector: "app-list-member",
  templateUrl: "./list-member.component.html",
  styleUrls: ["./list-member.component.css"],
})
export class ListMemberComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/user/getUserLogo/";
  roole = [
    "Coach",
    "Developpeur",
    "Program manager",
    "social relationship",
    "CEO",
    "co-founder",
    "designeur",
  ];
  updateForm: FormGroup;
  members = [];
  file: File;
  data: FormData;
  Search: "";
  member;
  index;
  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      Firstname: new FormControl(""),
      Lastname: new FormControl(""),
      Datedenaissance: new FormControl(""),
      numTel: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      img: new FormControl(""),
      role: new FormControl(""),
    });

    this.memberService.getAllMembers().subscribe((response: any) => {
      this.members = response;
    });
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  onchange(selectedValue) {
    this.updateForm.controls["role"].setValue(selectedValue);
  }
  modalOpened(i, member) {
    this.member = member;
    this.updateForm = new FormGroup({
      Firstname: new FormControl(member.Firstname),
      Lastname: new FormControl(member.Lastname),
      Datedenaissance: new FormControl(member.Datedenaissance),
      numTel: new FormControl(member.numTel),
      email: new FormControl(member.email),
      password: new FormControl(member.password),
      img: new FormControl(this.members[i].img),
      role: new FormControl(member.role),
    });
    this.index = i;
  }
  updateMember() {
    this.memberService
      .updateMember(this.member._id, this.updateForm.value)
      .subscribe(
        (res: any) => {
          Swal.fire({
            title: `${this.member.Firstname} est bien modfié`,
            icon: "success",
          });
          this.uploadLogo(res._id);
          this.memberService.getAllMembers().subscribe((response: any) => {
            this.members = response;
          });
        },
        (error) => {
          Swal.fire({ title: `${error}`, icon: "error" });
        }
      );
  }
  uploadLogo(id) {
    this.data = new FormData();
    this.data.append("file", this.file, this.file.name);
    this.memberService.uploadLogoMember(id, this.data).subscribe(
      (res: any) => {},
      (error) => {
        Swal.fire({ title: `${error}`, icon: "error" });
      }
    );
  }

  deleteMember(id, i) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.memberService.deleteMember(id).subscribe((res: any) => {
          this.members.splice(i, 1);
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      confirmButtonText: "oui !",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        this.router.navigate(["/"]);
        Swal.fire("Deconnecté!", "success");
      } else {
        Swal.fire({ title: "oups ! il ya un probléme ", icon: "error" });
      }
    });
  }
}
