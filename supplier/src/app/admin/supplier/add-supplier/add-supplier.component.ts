import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  @ViewChild('fromId') el: any;
  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }
    
  supplierForm: any;
  supplierList: any;
  aoopList: any;
  showAreaOfOperationDiv: any;
  ngOnInit(): void {
    this.supplierList = new MatTableDataSource([]);
      this.showAreaOfOperationDiv = false;
      this.loadSupplierList();
      this.aoopList = new FormGroup({
        areaOfOperation : new FormArray([])
    })
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
  onSubmit() {
    this.supplierForm.value.areaOfOperation = this.aoopList.value.areaOfOperation;
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
        }, error => this.toastr.error(error.statusText, error.status));
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
 
  next() {
    if(this.supplierForm.valid) {
              this.showAreaOfOperationDiv = true;
    } else {
          for (const key of Object.keys(this.supplierForm.controls)) {
                if (this.supplierForm.controls[key].invalid) {
                  this.toastr.error("Enter valid inputs first", key);
                  const invalidControl = this.el.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
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
