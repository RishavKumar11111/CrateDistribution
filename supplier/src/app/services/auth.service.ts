import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieeService: CookieService
  ) { }

  authenticateUser(token: any): Observable<any> {
    return this.http.post(`${serverUrl}/admin/authenticateUser`, token);
  }
  getUserName(): string {
    return this.cookieeService.get('userName');
  }
  getUserCode(): string {
    return this.cookieeService.get('userCode');
  }
  getUserId(): string {
    return this.cookieeService.get('userId');
  }
  getUserRole(): string {
    return this.cookieeService.get('role');
  }
  getDistrictCode(): string {
    return this.cookieeService.get('districtCode');
  }
  getToken(): string {
    return this.cookieeService.get('token');
  }
  isExistToken(): boolean {
    return this.cookieeService.check('token');
  }
  logout(): boolean {
      this.cookieeService.deleteAll();
      window.location.href = `${serverUrl}/home.html`;
      return true;
  }
  changePassword(data: any) {
    return this.http.post(`${serverUrl}/changePassword/`, data);
  }

}
