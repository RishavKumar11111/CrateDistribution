import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }
  
  userRole: string = '';
  userName: string = '';
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.userName = this.authService.getUserName();
  }

}
