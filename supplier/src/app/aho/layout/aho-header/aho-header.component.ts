import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aho-header',
  templateUrl: './aho-header.component.html',
  styleUrls: ['./aho-header.component.css']
})
export class AhoHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }
}
