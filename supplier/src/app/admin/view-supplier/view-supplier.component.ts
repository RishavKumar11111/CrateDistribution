import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent implements OnInit {

  details: any;
  supplierList: any; 
  term:any;
  displayedColumns: string[] = ['slNo', 'workOrderNo', 'itemQuantity', 'firmName', 'panNo', 'GSTN', 'areaOfOperation', 'remove'];
  constructor(
    private service: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  ngOnInit(): void {
        this.supplierList = new MatTableDataSource([]);
        this.loadSupplierList();
        this.details = {};
  }

      loadSupplierList() {
        this.service.getSuplierlist().subscribe((result: any) => {
            this.supplierList = new MatTableDataSource(result);
            this.supplierList.sort = this.sort;
            this.supplierList.paginator = this.paginator;
          }, error => this.toastr.error(error.statusText, error.status));
      }
  viewSupplierDetails(x: any) {
    this.details = x;
  }

  editdata(firmID:string)
{
     this.router.navigate(['/admin/updateSupplier'],{queryParams:{data:firmID}});
} 

delete(firmID: string){
  this.service.deleteSuplier(firmID).subscribe( data => {
    
    this.ngOnInit();
  });
  
}

        edit (x: any) {
          // this.supplierForm.patchValue({
          //         firmName: x.firmName,
          //         itemQuantity: x.itemQuantity,
          //         workOrderNo: x.workOrderNo,
          //         mobileNo: x.mobileNo,
          //         GSTN: x.GSTN
          // });
        }
        remove (workOrderNo: string) {
          this.service.deleteSuplier(workOrderNo).subscribe( (result: any) => {
                this.toastr.success(result.message, result.status);
                this.loadSupplierList();
          }, error => this.toastr.error(error.statusText, error.status));
        }
        applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.supplierList.filter = filterValue.trim().toLowerCase();
        }
}
