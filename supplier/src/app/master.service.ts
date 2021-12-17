import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  supplierDetails(id: string){
    return this.http.get('http://localhost:3004/getsupplierDetails/' +id);
  }
  updatesuplierDetails(firmID:string,suplierBody :any) {
    return this.http.put('http://localhost:3004/updatesupplierDetail/' +firmID , suplierBody);
  }
}
