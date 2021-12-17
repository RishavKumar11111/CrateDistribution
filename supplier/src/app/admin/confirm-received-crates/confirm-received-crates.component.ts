import { AdminService } from './../../services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-received-crates',
  templateUrl: './confirm-received-crates.component.html',
  styleUrls: ['./confirm-received-crates.component.css']
})
export class ConfirmReceivedCratesComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }
  confirmForm: any;
  selectedBlock: any;
  blockList: any;
  finYearList: any;
  finYear: any;
  noFoundFilterValue: any;
  receivedCrateList: any;
  displayedColumns: string[] = ['slNo', 'blockName', 'workOrderNo', 'lotNo', 'firmName', 'rDate', 'daysGap', 'rQuantity', 'ahoRemark', 'confirm'];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  selectedDistrict: any;
  districtList: any;

  ngOnInit(): void {
    this.receivedCrateList = new MatTableDataSource([]);
    this.finYear = '';
    this.selectedBlock = '';
    this.noFoundFilterValue = '';
    this.selectedDistrict = '';
    this.districtList = [];
    this.blockList = [];
    this.loadFinYear();
    this.loadDistrictList();
  }
  loadFinYear() {
    this.service.getFinYear().subscribe(result => {
          this.finYearList = result;
          this.finYear = result[0];
    }, error => this.toastr.error(error.statusText, error.status) );
  }  
  loadDistrictList() {
    this.service.getDistrictList().subscribe((result: any) => {
        this.districtList = result;
    }, error => this.toastr.error(error.statusText, error.status));
  }  
  loadBlockList() {
    this.service.getBlockList(this.selectedDistrict.districtCode).subscribe((result: any) => {
      this.blockList = result;
      this.blockList.push( { blockName: "All", blockCode: '' } )
      this.selectedBlock = this.blockList[this.blockList.length - 1];
    }, error => this.toastr.error(error.statusText, error.status));
  }
  loadReceivedCrateList() {
        this.service.getFinYearDistWiseReceivedCrateList(this.selectedDistrict.districtCode, this.finYear).subscribe(result => {
              this.receivedCrateList.data = result; 
              console.log(result);             
        }, error => this.toastr.error(error.statusText, error.status))
  }
  confirm(x: any) {
        this.service.confirmReceivedCrates(x.lotNo, x.blockCode, this.selectedDistrict.districtCode).subscribe(result => {
              this.toastr.success(result.message);
              this.loadReceivedCrateList();
        }, error => this.toastr.error(error.statusText, error.status))
  }
  applyFilterBlockWise() {
    this.receivedCrateList.filter = this.selectedBlock.blockCode.trim().toLowerCase();
    this.noFoundFilterValue = this.selectedBlock.blockName;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.receivedCrateList.filter = filterValue.trim().toLowerCase();
    this.noFoundFilterValue = filterValue;
  }

}
