import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AhoService } from 'src/app/services/aho.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crate-distribution',
  templateUrl: './crate-distribution.component.html',
  styleUrls: ['./crate-distribution.component.css']
})
export class CrateDistributionComponent implements OnInit {
  
  result: any;
  distrbutedQuantity: any;
  totalcrates = 0;
  userCode: any;
  finYearList: any;
  workOrderList: any;
  receivedQuantity: any;
  totalReceivedQuantity: any;
  wshg: any;
  wshgList: any;
  preDistNameOfFarmerID: any;
  districtCode: any;
  distributedCrateList: any;
  isFarmerAlreadyReceiverate: any;
  distributedCrateListColumns: string[] = ['slNo', 'distributedOn', 'farmer', 'owner', 'wshg', 'noOfCrates', 'view'];
  @ViewChild('distributionFormId') el: any;
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  constructor(
    private service: AhoService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  distributionForm: any;

  ngOnInit(): void {
    this.userCode = this.authService.getUserCode();
    this.districtCode = this.authService.getDistrictCode();
    this.wshg = new FormControl('', [Validators.required]);
    this.distributionForm = new FormGroup({
          workOrderNo: new FormControl('', [Validators.required]),
          wshgGroupName: new FormControl('', [Validators.required]),
          wshgGroupCode: new FormControl('', [Validators.required]),
          farmerId: new FormControl('', [Validators.required]),
          farmerName: new FormControl('', [Validators.required]),
          farmerAdhharNo: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]),
          farmerGender: new FormControl('', [Validators.required]),
          owner: new FormControl('Self', [Validators.required]),
          farmerShare: new FormControl('', [Validators.required]),
          noOfCrates: new FormControl(4, [Validators.required, Validators.max(4), Validators.min(1)]),
          otherAadharNo: new FormControl('', []),
          otherName: new FormControl('', []),
          finYear: new FormControl('', []),
          userId: new FormControl(this.authService.getUserId(), []),
          districtCode: new FormControl(this.authService.getDistrictCode(), []),
          blockCode: new FormControl(this.authService.getUserCode(), []),
          blockName: new FormControl(this.authService.getUserName(), [])
    })
    this.loadFinYear();
    this.loadWorkOrderList();
    this.loadWSHGList();
    this.loadDistCodeOfFarmerId();
    this.loadDistributedCrateList();
    this.distributedCrateList = new MatTableDataSource([]);
    this.workOrderList = [];
    this.finYearList = [];
    this.wshgList = [];
    this.isFarmerAlreadyReceiverate = false;

    this.distributionForm.get('owner').valueChanges
        .subscribe((value: any) => {
          if(value != 'Self') {
            this.distributionForm.get('otherName').setValidators([Validators.required, Validators.pattern('[a-zA-Z ]*')]);
            this.distributionForm.get('otherAadharNo').setValidators([Validators.required, Validators.min(100000000000), Validators.max(999999999999)]);
          } else {
            this.distributionForm.get('otherName').clearValidators();
            this.distributionForm.get('otherAadharNo').clearValidators();
          }
          this.distributionForm.get('otherName').updateValueAndValidity();
          this.distributionForm.get('otherAadharNo').updateValueAndValidity();
        }
      );
  }
  loadDistCodeOfFarmerId() {
        this.service.getPreDistNameOfFarmerID(this.districtCode).subscribe(result => {
              this.preDistNameOfFarmerID = result.distName;
        }, error => this.toastr.error(error.statusText, error.status) );
  }
  loadFinYear() {
    this.service.getFinYear().subscribe(result => {
          this.finYearList = result;
          this.finYear = result[0];
    }, error => this.toastr.error(error.statusText, error.status) );
  }
  loadWorkOrderList() {
      this.service.getFinYearWiseWorkOrderList(this.userCode, this.finYear).subscribe((result: any) => {
        this.workOrderList = result;
      }, error => this.toastr.error(error.statusText, error.status));
  }
  loadAvailableCrateQuantity() {
    this.service.getWOWiseQuantityDetail(this.userCode, this.workOrderNo).subscribe((result: any) => {
          this.receivedQuantity = result.receivedQuantity;
          this.distrbutedQuantity = result.distrbutedQuantity;
          this.totalReceivedQuantity = result.totalReceivedQuantity;
    }, error => this.toastr.error(error.statusText, error.status));
  }
  loadWSHGList() {
        this.service.getWSHGList().subscribe((result: any) => {
              this.wshgList = result;
        }, error => this.toastr.error(error.statusText, error.status));
  }
  searchFarmerIdDetails() {
        const farmerId = `${this.preDistNameOfFarmerID}/${this.farmerId}`;
        this.service.farmerIsReceiveCrate(farmerId).subscribe(result => {
              this.isFarmerAlreadyReceiverate = result.status;
        }, error => this.toastr.error(error.statusText, error.status));
        this.service.getFarmer(farmerId).subscribe( result => {
              if(result.length > 0) {
                  this.farmerName = result[0].vchfarmername;
                  this.farmerAdhharNo = result[0].VCHAADHARNO;
                  this.farmerGender = result[0].INTGENDER === 1 ? 'Male' : 'Female';
              } else {
                  this.farmerName = '';
                  this.farmerAdhharNo = '';
                  this.farmerGender = '';
              }
        }, error => this.toastr.error(error.statusText, error.status));
  }
  loadDistributedCrateList() {
      this.service.getDistributedCrateList(this.finYear).subscribe(result => {
            this.distributedCrateList.data = result;
            setTimeout(() => {
              this.distributedCrateList.sort = this.sort;
              this.distributedCrateList.paginator = this.paginator;
            }, 500);
      }, error => this.toastr.error(error.statusText, error.status));
  }
  viewDetails(x: any) {

  }
  onSubmit() {
        if(this.distributionForm.valid) {
          if(this.isFarmerAlreadyReceiverate) {
                  this.toastr.error('This farmer already receive crates');
          } else {
                  this.farmerId = `${this.preDistNameOfFarmerID}/${this.farmerId}`;
                  this.service.addCrateDistributionDetail(this.distributionForm.value).subscribe( result => {
                        if(result.success) {
                              this.toastr.success(result.message);
                              this.distributionForm.patchValue({
                                    farmerId: '',
                                    farmerName: '',
                                    farmerAdhharNo: '',
                                    farmerGender: '',
                                    owner: 'Self',
                                    otherAadharNo: '',
                                    otherName: '',
                              });
                              this.loadDistributedCrateList();
                              this.loadAvailableCrateQuantity();
                        } else {
                          this.toastr.warning(result.message);
                        }
                    }, error => this.toastr.error(error.statusText, error.status) )
          }
        } else {
              this.toastr.error(`Please fill all mandatory fields.`);
            for (const key of Object.keys(this.distributionForm.controls)) {
                  if (this.distributionForm.controls[key].invalid) {
                    // console.log(key);
            //         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            //         invalidControl.focus();
            //         invalidControl.blur();
            //         invalidControl.focus();
            //         break;
                }
            }
        }
  }
  removeFarmer(i: any) {
        // this.repeat.splice(i, 1)
        // this.totalcrates = 0;
        // this.repeat.forEach((x) => {
        //   this.totalcrates = this.totalcrates + x[0].Crate;
        // })

  }
  claculate() {
        this.totalcrates = 0;
        // this.repeat.forEach((x) => {
        //   this.totalcrates = this.totalcrates + x[0].Crate;
        // })
  }




  addWSHG() {
      this.wshgGroupCode = this.wshg.value.groupCode;
      this.wshgGroupName = this.wshg.value.groupName;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.distributedCrateList.filter = filterValue.trim().toLowerCase();
  }
  // GETTER & SETTER FOR FORM-GROUP
  set wshgGroupCode (val) {
    this.distributionForm.get('wshgGroupCode').setValue(val);
  }
  get wshgGroupCode () {
    return this.distributionForm.get('wshgGroupCode').value
  }
  set wshgGroupName (val) {
    this.distributionForm.get('wshgGroupName').setValue(val);
  }
  get wshgGroupName () {
    return this.distributionForm.get('wshgGroupName').value
  }
  set farmerId (val) {
    this.distributionForm.get('farmerId').setValue(val);
  }
  get farmerId () {
    return this.distributionForm.get('farmerId').value
  }
  set farmerName (val) {
    this.distributionForm.get('farmerName').setValue(val);
  }
  get farmerName () {
    return this.distributionForm.get('farmerName').value
  }
  set farmerAdhharNo (val) {
    this.distributionForm.get('farmerAdhharNo').setValue(val);
  }
  get farmerAdhharNo () {
    return this.distributionForm.get('farmerAdhharNo').value
  }
  set farmerGender (val) {
    this.distributionForm.get('farmerGender').setValue(val);
  }
  get farmerGender () {
    return this.distributionForm.get('farmerGender').value
  }
  set owner (val) {
    this.distributionForm.get('owner').setValue(val);
  }
  get owner () {
    return this.distributionForm.get('owner').value
  }
  set noOfCrates (val) {
    this.distributionForm.get('noOfCrates').setValue(val);
  }
  get noOfCrates () {
    return this.distributionForm.get('noOfCrates').value
  }
  set otherAadharNo (val) {
    this.distributionForm.get('otherAadharNo').setValue(val);
  }
  get otherAadharNo () {
    return this.distributionForm.get('otherAadharNo').value
  }
  set otherName (val) {
    this.distributionForm.get('otherName').setValue(val);
  }
  get otherName () {
    return this.distributionForm.get('otherName').value
  }
  set finYear (val) {
    this.distributionForm.get('finYear').setValue(val);
  }
  get finYear () {
    return this.distributionForm.get('finYear').value
  }
  set workOrderNo (val) {
    this.distributionForm.get('workOrderNo').setValue(val);
  }
  get workOrderNo () {
    return this.distributionForm.get('workOrderNo').value
  }

  get workOrderNoVal () { return this.distributionForm.get('workOrderNo'); }
  get noOfCratesVal () { return this.distributionForm.get('noOfCrates'); }
  get farmerIdVal () { return this.distributionForm.get('farmerId'); }
  get otherAadharNoVal () { return this.distributionForm.get('otherAadharNo'); }
  get otherNameVal () { return this.distributionForm.get('otherName'); }
  get farmerShareVal () { return this.distributionForm.get('farmerShare'); }
}
