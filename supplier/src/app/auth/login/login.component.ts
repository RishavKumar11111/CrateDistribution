import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    switch (role) {
          case 'ADMIN': {
                  this.router.navigate(['/admin']);
                  break;
              }
          case 'AHO': {
                  this.router.navigate(['/aho']);
                  break;
              }
          case 'DM': {
                  this.router.navigate(['/dm']);
                  break;
              }
          case 'SUPPLIER': {
                this.router.navigate(['/supplier']);
                break;
              }
          default: {
                  window.location.href = `${serverUrl}/home.html`;
                  break;
              }
      }
  }

}
