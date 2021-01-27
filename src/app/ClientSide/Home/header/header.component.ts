import { Component, OnInit } from '@angular/core';
import { authAdminService } from 'src/app/services/authAdmin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
