import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-supplier-header',
  templateUrl: './supplier-header.component.html',
  styleUrls: ['./supplier-header.component.css']
})
export class SupplierHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }
}
