import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/entities/User';
import Swal from 'sweetalert2';
import { Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent implements OnInit {
  pictureBaseUrl: String = environment.baseuri + "/user/getUserLogo/";
  members = []
  file : File ; 
  data : FormData;
  Search : "";
  user : User
  id ; 
  index
  constructor(private memberService : MemberService , private router :Router) { }

  ngOnInit(): void {

    this.memberService.getAllMembers().subscribe((response: any) => {
      this.members = response; 
    });

    
  }

  deleteMember(id,i ) {
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
        this.memberService.deleteMember(id).subscribe((res: any) => {
          this.members.splice(i, 1);
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
