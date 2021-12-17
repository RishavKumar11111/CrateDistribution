import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DmService {


  constructor(private http: HttpClient) { }

  getBlockList(districtCode: any): Observable<any> {
    return this.http.get(`${serverUrl}/getBlockList/${districtCode}`);
  }
  getFinYear(): Observable<any> {
      return this.http.get(`${serverUrl}/api/getFinYear`);
  }
  getFinYearDistWiseReceivedCrateList(districtCode: string, finYear: string): Observable<any>{
    return this.http.get(`${serverUrl}/dm/getFinYearDistWiseReceivedCrateList/${districtCode}?finYear=${finYear}`);
  }
  confirmReceivedCrates(lotNo: string, blockCode: string, userCode: string): Observable<any>{
    return this.http.get(`${serverUrl}/dm/confirmReceivedCrates/${userCode}/${lotNo}/${blockCode}`);
  }}
