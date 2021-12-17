import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DmService } from 'src/app/services/dm.service';

@Component({
  selector: 'app-confirm-workorder',
  templateUrl: './confirm-workorder.component.html',
  styleUrls: ['./confirm-workorder.component.css']
})
export class ConfirmWorkorderComponent implements OnInit {

  constructor(
    private service: DmService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }
  confirmForm: any;
  selectedBlock: any;
  blockList: any;
  finYearList: any;
  finYear: any;
  userCode: any;
  noFoundFilterValue: any;
  receivedCrateList: any;
  displayedColumns: string[] = ['slNo', 'blockName', 'workOrderNo', 'lotNo', 'firmName', 'rDate', 'rQuantity', 'ahoRemark', 'confirm'];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  ngOnInit(): void {
    this.userCode = this.authService.getUserCode();
    this.receivedCrateList = new MatTableDataSource([]);
    this.finYear = '';
    this.selectedBlock = '';
    this.noFoundFilterValue = '';
    this.blockList = [];
    this.loadFinYear();
    this.loadBlockList();
    this.loadReceivedCrateList();
  }
  loadFinYear() {
    this.service.getFinYear().subscribe(result => {
          this.finYearList = result;
          this.finYear = result[0];
    }, error => this.toastr.error(error.statusText, error.status) );
  }  
  loadBlockList() {
    this.service.getBlockList(this.userCode).subscribe((result: any) => {
      this.blockList = result;
      this.blockList.push( { blockName: "All", blockCode: '' } )
      this.selectedBlock = this.blockList[this.blockList.length - 1];
    }, error => this.toastr.error(error.statusText, error.status));
  }
  loadReceivedCrateList() {
        this.service.getFinYearDistWiseReceivedCrateList(this.userCode, this.finYear).subscribe(result => {
              this.receivedCrateList.data = result;              
        }, error => this.toastr.error(error.statusText, error.status))
  }
  confirm(x: any) {
        this.service.confirmReceivedCrates(x.lotNo, x.blockCode, this.userCode).subscribe(result => {
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
