import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
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
  aoopList: any;
  showAreaOfOperationDiv: any;
  ngOnInit(): void {
      this.showAreaOfOperationDiv = false;
      this.aoopList = this.formBuilder.group({
        areaOfOperation : new FormArray([])
    })
    this.supplierForm = this.formBuilder.group({
        workOrderNo : ['', Validators.required],
        itemQuantity : ['', Validators.required],
        firmName : ['', Validators.required],
        emailId : ['', Validators.required],
        panNo : ['', Validators.required],
        mobileNo : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        GSTN : ['', Validators.required],
        areaOfOperation : this.formBuilder.array([])
    })
  }
  onSubmit() {
    this.supplierForm.value.areaOfOperation = this.aoopList.value.areaOfOperation;
                  if(this.supplierForm.value.areaOfOperation.length > 0) {
                      this.service.addSupplier(this.supplierForm.value).subscribe((result: any) => {
                            this.toastr.success(result.message, result.status);
                            this.supplierForm.reset();
                            this.showAreaOfOperationDiv = false;
                      }, error => this.toastr.error(error.statusText, error.status));
                  } else {
                    this.toastr.error('Please add minimum 1 district.');
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
  next() {
    if(this.supplierForm.valid) {
              this.showAreaOfOperationDiv = true;
    } else {
          for (const key of Object.keys(this.supplierForm.controls)) {
                if (this.supplierForm.controls[key].invalid) {
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
