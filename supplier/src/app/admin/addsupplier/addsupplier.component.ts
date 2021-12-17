import { AdminService } from './../../services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.css']
})
export class AddsupplierComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }
  supplierForm: any;
  selectedDistrict: any;
  selectedBlock: any;
  districtList: any;
  blockList: any;
  areaOfOperationList: any;
  areaOfOperationBlocks: any;
  blockListColumns: string[] = ['slNo', 'blockCode', 'blockName', 'select'];
  aooListColumns: string[] = ['slNo', 'district', 'block', 'remove'];
  isDuplicateWONo: any;
  supplierList: any;


  showAreaOfOperationDiv: any;


  @ViewChild(MatSort) sort: any;
  @ViewChild('paginatorRef') paginator: any;
  @ViewChild('paginatorRefAOF') aooPaginator: any;
  @ViewChild('supplierFormId') el: any;
  ngOnInit(): void {
      this.supplierList = new MatTableDataSource([]);
      this.isDuplicateWONo = false;
      this.showAreaOfOperationDiv = false;
      this.selectedDistrict = '';
      this.selectedBlock = '';
      this.districtList = [];
      this.blockList = new MatTableDataSource([]);
      this.areaOfOperationList = new MatTableDataSource([]);
      this.areaOfOperationBlocks = [];
      this.loadDistrict();
      this.loadSupplierList();
      this.supplierForm = new FormGroup({
          workOrderNo : new FormControl('',[Validators.required]),
          itemQuantity : new FormControl('',[Validators.required]),
          firmName : new FormControl('',[Validators.required]),
          emailId : new FormControl('',[Validators.required]),
          GSTN : new FormControl('',[Validators.required]),
          panNo : new FormControl('',[Validators.required]),
          mobileNo : new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          areaOfOperation : new FormArray([])
      })
  }
  get panNo() { return this.supplierForm.get('panNo'); }
  get mobileNo() { return this.supplierForm.get('mobileNo'); }
  get workOrderNo() { return this.supplierForm.get('workOrderNo'); }
  get firmName() { return this.supplierForm.get('firmName'); }
  get emailId() { return this.supplierForm.get('emailId'); }
  get itemQuantity() { return this.supplierForm.get('itemQuantity'); }
  get GSTN() { return this.supplierForm.get('GSTN'); }
  onSubmit() {
                  if(this.supplierForm.value.areaOfOperation.length > 0) {
                      this.service.addSupplier(this.supplierForm.value).subscribe((result: any) => {
                            this.toastr.success(result.message, result.status);
                            this.supplierForm.reset();
                            this.showAreaOfOperationDiv = false;
                            this.loadSupplierList();
                      }, error => this.toastr.error(error.statusText, error.status));
                  } else {
                    this.toastr.error('Please add minimum 1 district.');
                  }
  }
  loadSupplierList() {
      this.service.getSuplierlist().subscribe((result: any) => {
          this.supplierList = new MatTableDataSource(result);
          this.supplierList.sort = this.sort;
          this.supplierList.paginator = this.paginator;
        }, error => this.toastr.error(error.statusText, error.status));
  }
  loadDistrict() {
    this.service.getDistrictList().subscribe(result => {
      this.districtList = result;
    }, error => this.toastr.error(error.statusText, error.status));
  }
  loadBlock() {
        this.service.getBlockList(this.selectedDistrict.districtCode).subscribe((result: any) => {
              for(let i = 0; i < result.length; i++) {
                for(let j = 0; j < this.supplierForm.value.areaOfOperation.length; j++) {
                  if(this.supplierForm.value.areaOfOperation[j].districtCode === result[i].districtCode && this.supplierForm.value.areaOfOperation[j].blockCode === result[i].blockCode) {
                    result[i].isChecked = this.supplierForm.value.areaOfOperation[j].isChecked ? true : false;
                  }
                }
              }
              this.blockList.data = result;
              this.blockList.sort = this.sort;
              this.blockList.paginator = this.paginator;
        }, error => this.toastr.error(error.statusText, error.status));
  }
  assignDistrict() {
      if(this.areaOfOperationBlocks.length > 0) {
          this.areaOfOperationBlocks.forEach((e: any) => {
            this.supplierForm.value.areaOfOperation.push(e);
          });
          this.selectedDistrict = '';
          this.blockList.data = [];
          this.areaOfOperationBlocks = [];
          this.areaOfOperationList.data = this.supplierForm.value.areaOfOperation;
          this.areaOfOperationList.paginator = this.aooPaginator;
      } else {
          this.toastr.error('Please select minimum one block');
      }
  }
  removeAreaOfOperation(index: any) {
    this.supplierForm.value.areaOfOperation.splice(index, 1);
    this.areaOfOperationList._updateChangeSubscription();
  }
  selectAssignedBlock(x: any) {
        if(x.isChecked) {
          x.districtName = this.selectedDistrict.districtName;
          this.areaOfOperationBlocks.push(x);
        } else {
          let index = this.areaOfOperationBlocks.findIndex((e: any) => e.blockCode === x.blockCode && e.districtCode === this.selectedDistrict.districtCode);
          this.areaOfOperationBlocks.splice(index, 1);
        }
  }
  edit (x: any) {
    this.supplierForm.patchValue({
            firmName: x.firmName,
            itemQuantity: x.itemQuantity,
            workOrderNo: x.workOrderNo,
            mobileNo: x.mobileNo,
            GSTN: x.GSTN
    });
  }
  remove (workOrderNo: string) {
    this.service.deleteSuplier(workOrderNo).subscribe( (result: any) => {
          this.toastr.success(result.message, result.status);
          this.loadSupplierList();
    }, error => this.toastr.error(error.statusText, error.status));
  }
  checkWorkOrderExistance() {
    if(this.supplierForm.value['workOrderNo'] == '') {
      this.isDuplicateWONo = false;
    } else {
        this.isDuplicateWONo = this.supplierList._data._value.some((e: any) => e.workOrderNo === this.supplierForm.value['workOrderNo']);
    }
  }
  applyBlockListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.blockList.filter = filterValue.trim().toLowerCase();
  }
  applyAOOListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.areaOfOperationList.filter = filterValue.trim().toLowerCase();
  }
 
  next() {
    if(this.supplierForm.valid) {
        if(!this.isDuplicateWONo) {
            this.showAreaOfOperationDiv = true;
        } else {
              this.toastr.error('Enter unique workorder number.');    
        }
    } else {
          for (const key of Object.keys(this.supplierForm.controls)) {
                if (this.supplierForm.controls[key].invalid) {
                  const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                  invalidControl.focus();
                  invalidControl.blur();
                  invalidControl.focus();
                  break;
              }
          }
    }
  }
  back() {
    this.showAreaOfOperationDiv = false;
  }
}