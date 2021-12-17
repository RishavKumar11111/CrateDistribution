import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AhoService } from 'src/app/services/aho.service';

@Component({
  selector: 'app-receive-crate',
  templateUrl: './receive-crate.component.html',
  styleUrls: ['./receive-crate.component.css']
})
export class ReceiveCrateComponent implements OnInit {
  result: any[] = [];
  workOrderList : any;
  finYear: any;
  finYearList: any;
  userCode: any;
  selectedLot: any;
  receivedCrateList: any;

  constructor(
    private service: AhoService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userCode = this.authService.getUserCode();
    this.finYear = '';
    this.workOrderList = [];
    this.receivedCrateList = [];
    this.loadFinYear();
    this.loadLotList();
    this.loadReceivedCrateList();
    this.selectedLot = {};
  }
  loadFinYear() {
    this.service.getFinYear().subscribe(result => {
          this.finYearList = result;
          this.finYear = result[0];
    }, error => this.toastr.error(error.statusText, error.status) );
  }
  loadLotList() {
    this.service.getFinYearWiseLotList(this.userCode, this.finYear).subscribe(result => {
          this.workOrderList = result;
    }, error => this.toastr.error(error.statusText, error.status))
  }
  showReceiveModal(x: any) {
      this.selectedLot = x;
      this.selectedLot.receivedQuantity = x.totalQuantity;
      this.selectedLot.remark = '';
  }
  receive() {
      let data = {
        receivedQuantity: this.selectedLot.receivedQuantity,
        remark: this.selectedLot.remark
      }
      this.service.receiveCreatesFromLot(this.selectedLot.lotNo, this.userCode, data).subscribe(result => {
          this.toastr.success(result.message);
          this.loadLotList();
          this.loadReceivedCrateList();
      }, error => this.toastr.error(error.statusText, error.status));
  }
  loadReceivedCrateList() {
        this.service.getFinYearWiseReceivedCrateList(this.userCode, this.finYear).subscribe(result => {
              this.receivedCrateList = result;
        }, error => this.toastr.error(error.statusText, error.status))
  }
}
