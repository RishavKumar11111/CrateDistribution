import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    private toastr: ToastrService
  ) { }
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  selectedSupplierId: string = '';
  showSuppliersList: boolean = true;
  showEditPage: boolean = false;
  showViewDetailPage: boolean = false;
  ngOnInit(): void {
    this.supplierList = new MatTableDataSource([]);
    this.loadSupplierList();
  }
  loadSupplierList() {
        const spListSubsciption = this.service.getSuplierlist().subscribe((result: any) => {
            this.supplierList.data = result;
            this.supplierList.sort = this.sort;
            this.supplierList.paginator = this.paginator;
            spListSubsciption.unsubscribe();
          }, error => this.toastr.error(error.statusText, error.status));
  }
  edit (supplierId: any) {
        this.selectedSupplierId = supplierId;
        this.showSuppliersList = false;
        this.showViewDetailPage = false;
        this.showEditPage = true;
  }
  backToList() {
    this.showEditPage = false;
    this.showViewDetailPage = false;
    this.showSuppliersList = true;
    this.loadSupplierList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.supplierList.filter = filterValue.trim().toLowerCase();
  }


}
