import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-supplier-list',
  templateUrl: './view-supplier-list.component.html',
  styleUrls: ['./view-supplier-list.component.css']
})
export class ViewSupplierListComponent implements OnInit {
  supplierList: any; 
  displayedColumns: string[] = ['slNo', 'workOrderNo', 'firmName', 'email', 'itemQuantity', 'areaOfOperation', 'edit'];
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
  }
  loadSupplierList() {
        this.service.getSuplierlist().subscribe((result: any) => {
            this.supplierList.data = result;
            this.supplierList.sort = this.sort;
            this.supplierList.paginator = this.paginator;
          }, error => this.toastr.error(error.statusText, error.status));
  }
  edit (supplierId: any) {
        this.router.navigate(['/admin/updateSupplier', supplierId])
  }
  // remove (userId: string) {
  //   this.service.deleteSuplier(userId).subscribe( (result: any) => {
  //         this.toastr.success(result.message, result.status);
  //         this.loadSupplierList();
  //   }, error => this.toastr.error(error.statusText, error.status));
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.supplierList.filter = filterValue.trim().toLowerCase();
  }

}
