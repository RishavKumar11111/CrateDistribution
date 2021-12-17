import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supply-to-block',
  templateUrl: './supply-to-block.component.html',
  styleUrls: ['./supply-to-block.component.css']
})
export class SupplyToBlockComponent implements OnInit {
  districtList: any;
  selectedDistrict: any;
  blockList: any;
  supplyForm: any;
  selection = new SelectionModel(true, []);
  blockTableColumns: string[] = ['slNo', 'blockCode', 'blockName', "enterQuantity"];
  lotAreaTableColumns: string[] = ['slNo', 'district', 'block', 'quantity', "remove"];
  workOrderNo: any;
  suplierDetails: any;
  availableCrate: any;
  distWiseTotalQuantity: any;
  lotNo: any;
  lotArea: any;
  totalAvailableCrateQuantity: any;
  selectAreaDiv: any;
  picker: any;

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild('supplyFormId') el: any;
  constructor(
    private service: SupplierService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.selectAreaDiv = false;
    this.selectedDistrict = '';
    this.districtList = [];
    this.lotArea = new MatTableDataSource([]);
    this.distWiseTotalQuantity = 0;
    this.suplierDetails = {
      areaOfOperation: []
    };
    this.workOrderNo = this.authService.getUserId();
    this.loadAvailableCrateQuantityOfWO();
    this.loadSupplierDetails();
    this.blockList = new MatTableDataSource([]);
    this.supplyForm = new FormGroup({
          workOrderNo: new FormControl('', [Validators.required]),
          firmName: new FormControl('', [Validators.required]),
          supplierMobileNo: new FormControl('', [Validators.required]),
          vehicleNo: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z|a-z]{2}\s?[0-9]{1,2}\s?[A-Z|a-z]{0,3}\s?[0-9]{4}$/)]),
          vehicleName: new FormControl('', [Validators.required]),
          deliveryDate: new FormControl('', [Validators.required]),
          totalQuantity: new FormControl(0, [Validators.required]),
          invoiceNo: new FormControl('', [Validators.required]),
          wayBillNo: new FormControl('', [Validators.required]),
          area: new FormArray([])
    })
  }
  loadBlock() {
          this.blockList.data = [];
          const bList: any = [];
          
          this.suplierDetails.areaOfOperation.forEach((e: any) => {
                if(this.selectedDistrict.districtCode === e.districtCode) {
                  let preValue = this.supplyForm.value['area'][this.supplyForm.value['area'].findIndex((i: any) => i.districtCode === e.districtCode && i.blockCode === e.blockCode )];
                      bList.push({ 
                        districtCode: e.districtCode, 
                        districtName: e.districtName, 
                        blockCode: e.blockCode, 
                        blockName: e.blockName, 
                        crateQuantity: preValue ? preValue.crateQuantity : ''
                      });
                }
          })
          this.blockList.data = bList;
          this.blockList.sort = this.sort;
          this.blockList.paginator = this.paginator;
  }
  onSubmit() {
        if(this.supplyForm.value['area'].length > 0) {
              let data = {
                area: this.supplyForm.value['area'],
                totalQuantity: this.supplyForm.value['totalQuantity']
              };
              this.service.updateAreaOfSupply(data, this.lotNo).subscribe((result: any) => {
                    this.loadAvailableCrateQuantityOfWO()
                    this.toastr.success(result.message);
                    this.supplyForm.get('vehicleNo').reset();
                    this.supplyForm.get('vehicleName').reset();
                    this.supplyForm.get('deliveryDate').reset();
                    this.selectAreaDiv = false;
                    this.lotNo = '';
              }, error => this.toastr.error(error.statusText, error.status));
        } else {
          this.toastr.error('Plase add minimum 1 district');
        }
  }
  
  get vehicleNo() { return this.supplyForm.get('vehicleNo'); }
  get vehicleName() { return this.supplyForm.get('vehicleName'); }
  get noOfItems() { return this.supplyForm.get('noOfItems'); }
  get deliveryDate() { return this.supplyForm.get('deliveryDate'); }
  get invoiceNo() { return this.supplyForm.get('invoiceNo'); }
  get wayBillNo() { return this.supplyForm.get('wayBillNo'); }

  loadAvailableCrateQuantityOfWO() {
      this.service.getAvailableCrateQuantityOfWO(this.workOrderNo).subscribe(result => {
            this.availableCrate = result.availableCrateQuantity;
            this.totalAvailableCrateQuantity = result.availableCrateQuantity;
      }, error => this.toastr.error(error.statusText, error.status));
  }
  loadSupplierDetails() {
        this.service.getSupplierDetailsByWONo(this.workOrderNo).subscribe((result: any) => {
              this.suplierDetails = result;
              this.suplierDetails.areaOfOperation.forEach((e: any) => {
                  if(!this.districtList.some((d: any) => d.districtCode === e.districtCode) ) {
                    this.districtList.push({districtCode: e.districtCode, districtName: e.districtName})
                  }
              });
              this.supplyForm.patchValue({
                    workOrderNo: this.suplierDetails.workOrderNo,
                    firmName: this.suplierDetails.firmName,
                    supplierMobileNo: this.suplierDetails.mobileNo
              })
        }, error => this.toastr.error(error.statusText, error.status));
  }
  checkCrateQuantity(x: any, index: any) {
    let total = 0;
    this.blockList._data._value.forEach((e: any) => {
            total = total + (e.crateQuantity || 0);
    })
    const avl  = this.totalAvailableCrateQuantity - this.supplyForm.value['totalQuantity'] - total;
    if(avl < 0) {      
            this.availableCrate = avl + x.crateQuantity;
            x.crateQuantity = '';
            this.toastr.error('Can not exceed from total available crate.')
    } else {
            this.availableCrate = avl;
    }
    this.distWiseTotalQuantity = this.totalAvailableCrateQuantity - this.availableCrate - this.supplyForm.value['totalQuantity'];
  }
  addDistrict() {
    let count = 0;
    this.blockList._data._value.forEach((e: any) => {
        const index = this.supplyForm.value['area'].findIndex( (d: any) => d.districtCode === e.districtCode && d.blockCode === e.blockCode );
        if(e.crateQuantity) {
          count++;
          if(index === -1) {
              this.supplyForm.value['area'].push(e);
          } else {
              this.supplyForm.value['area'][index] = e;
          }
        } else if(index !== -1) {
              this.supplyForm.value['area'].splice(index, 1);
        }
    });
    if(count === 0) {
          this.toastr.error('Please add quantity of minimum one block');
    } else {
          this.supplyForm.value['totalQuantity'] = this.supplyForm.value['area'].reduce((a: any, b: any) =>  a + b.crateQuantity, 0 );
          this.blockList.data = [];
          this.distWiseTotalQuantity = 0;
          this.selectedDistrict = '';
          this.lotArea.data = this.supplyForm.value['area'];
    }
  }
  next() {
      if(this.supplyForm.valid) {
            const data = this.supplyForm.value;
            data.lotNo = this.lotNo;
            this.service.addSupply(data).subscribe((result: any) => {
                if(!this.lotNo) {
                  this.lotNo = result.lotNo;
                }
                this.toastr.success(result.message);
                this.selectAreaDiv = true;
            }, error => this.toastr.error(error.statusText, error.status))
      } else {
            for (const key of Object.keys(this.supplyForm.controls)) {
                  if (this.supplyForm.controls[key].invalid) {
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
    this.selectAreaDiv = false;
  }
  applyAssignedBlockListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.blockList.filter = filterValue.trim().toLowerCase();
  }
  removeArea(index: any) {
    this.supplyForm.value.area.splice(index, 1);
    this.lotArea._updateChangeSubscription();
  }
}
