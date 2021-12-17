import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addSupplier(data: any): Observable<any> {
    return this.http.post(`${serverUrl}/admin/addSuplier`, data);
  }
  getSuplierlist(): Observable<any> {
    return this.http.get(`${serverUrl}/admin/getSupplierlist`);
  }
  deleteSuplier(workOrderNo: string): Observable<any> {
    return this.http.delete(`${serverUrl}/admin/deletesupplierData/${workOrderNo}`);
  }
  getDistrictList(): Observable<any> {
      return this.http.get(`${serverUrl}/getDistrictList`);
  }
  getBlockList(id: any): Observable<any> {
    return this.http.get(`${serverUrl}/getBlockList/${id}`);
  }
  getFinYear(): Observable<any> {
      return this.http.get(`${serverUrl}/api/getFinYear`);
  }
  getFinYearDistWiseReceivedCrateList(districtCode: string, finYear: string): Observable<any>{
    return this.http.get(`${serverUrl}/admin/getFinYearDistWiseReceivedCrateList/${districtCode}?finYear=${finYear}`);
  }
  confirmReceivedCrates(lotNo: string, blockCode: string, userCode: string): Observable<any>{
    return this.http.get(`${serverUrl}/admin/confirmReceivedCrates/${userCode}/${lotNo}/${blockCode}`);
  }
  getSupplierDetails(supplierId: string): Observable<any>{
    return this.http.get(`${serverUrl}/admin/getSupplierDetails/${supplierId}`);
  }
  updateSupplierDetails(supplierId: string, data: any): Observable<any> {
    return this.http.put(`${serverUrl}/admin/updateSupplierDetails/${supplierId}`, data);
  }
  checkWONoDuplicate(woNo: string): Observable<any>  {
    return this.http.get(`${serverUrl}/admin/checkWONoDuplicate/${woNo}`);
  }
}
