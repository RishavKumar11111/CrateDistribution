import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AhoService {


  constructor(
    private http: HttpClient
  ) { }

  getFinYearWiseWorkOrderList(userCode: string, finYear: string): Observable<any> {
    return this.http.get(`${serverUrl}/aho/getFinYearWiseWorkOrderList/${userCode}?finYear=${finYear}`);
  }
  getFarmer(farmerId: any): Observable<any> {
    return this.http.get(`http://apicol.nic.in/api/FarmerData/Fdetails?fid=${farmerId}`)
  }
  getFinYearWiseLotList(userCode: string, finYear: string): Observable<any>{
    return this.http.get(`${serverUrl}/aho/getFinYearWiseLotList/${userCode}?finYear=${finYear}`);
  }
  getFinYearWiseReceivedCrateList(userCode: string, finYear: string): Observable<any>{
    return this.http.get(`${serverUrl}/aho/getFinYearWiseReceivedCrateList/${userCode}?finYear=${finYear}`);
  }
  getFinYear(): Observable<any> {
      return this.http.get(`${serverUrl}/api/getFinYear`);
  }
  receiveCreatesFromLot(lotNo: string, userCode: string, data: any): Observable<any> {
    return this.http.put(`${serverUrl}/aho/receiveCreatesFromLot/${lotNo}/${userCode}`, data);
  }
  getWOWiseQuantityDetail(userCode: string, woNo: any): Observable<any> {
    return this.http.get(`${serverUrl}/aho/getWOWiseQuantityDetail/${userCode}/${woNo}`);
  }
  getWSHGList(): Observable<any> {
      return this.http.get(`${serverUrl}/aho/getWSHGList`);
  }
  getPreDistNameOfFarmerID(districtCode: string): Observable<any> {
      return this.http.get(`${serverUrl}/aho/getPreDistNameOfFarmerID/${districtCode}`);
  }
  addCrateDistributionDetail(data: any): Observable<any> {
      return this.http.post(`${serverUrl}/aho/addCrateDistributionDetail/`, data);
  }
  getDistributedCrateList(finYear: any): Observable<any> {
      return this.http.get(`${serverUrl}/aho/getDistributedCrateList/?finYear=${finYear}`);
  }
  farmerIsReceiveCrate(farmerId: any): Observable<any> {
      return this.http.get(`${serverUrl}/aho/farmerIsReceiveCrate/?farmerId=${farmerId}`);
  }}
