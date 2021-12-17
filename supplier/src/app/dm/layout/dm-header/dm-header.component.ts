import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dm-header',
  templateUrl: './dm-header.component.html',
  styleUrls: ['./dm-header.component.css']
})
export class DmHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }

}
