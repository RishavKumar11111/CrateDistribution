import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }


  getDistrictList(): Observable<any> {
      return this.http.get(`${serverUrl}/getDistrictList`);
  }
  getBlockList(id: any): Observable<any> {
    return this.http.get(`${serverUrl}/getBlockList/${id}`);
  }
  addSupply(data: any): Observable<any> {
    return this.http.post(`${serverUrl}/supplier/addSupply`, data);    
  }
  getAvailableCrateQuantityOfWO(woNo: string): Observable<any> {
      return this.http.get(`${serverUrl}/supplier/getAvailableCrateQuantityOfWO/${woNo}`);
  }
  updateAreaOfSupply(data: any, lotNo: string): Observable<any> {
      return this.http.put(`${serverUrl}/supplier/updateAreaOfSupply/${lotNo}`, data);
  }
  getSupplyList(): Observable<any> {
    return this.http.get(`${serverUrl}/supplier/getSupplyList`);
  }
  getSupplierDetailsByWONo(woNo: any): Observable<any> {
    return this.http.get(`${serverUrl}/supplier/getSupplierDetailsByWONo/${woNo}`);
  }
}
