import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  supplierForm: any;  
  aoopList: any;
  showAreaOfOperationDiv: any;
  @Input() supplierId: any;
  @Output() backEvent = new EventEmitter<string>();
  ngOnInit(): void {
        this.loadSupplierDetails();
        this.showAreaOfOperationDiv = false;

        this.aoopList = this.formBuilder.group({
          areaOfOperation : new FormArray([])
        })
        this.supplierForm = this.formBuilder.group({
            workOrderNo : ['', Validators.required],
            itemQuantity : ['', Validators.required],
            firmName : ['', Validators.required],
            emailId : ['', Validators.required],
            GSTN : ['', Validators.required],
            panNo : ['', Validators.required],
            mobileNo : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
            areaOfOperation : this.formBuilder.array([])
        })
  }
  loadSupplierDetails() {
      this.service.getSupplierDetails(this.supplierId).subscribe(result => {
            this.supplierForm.patchValue({
                  workOrderNo : result.workOrderNo,
                  itemQuantity : result.itemQuantity,
                  firmName : result.firmName,
                  emailId : result.emailId,
                  GSTN : result.GSTN,
                  panNo : result.panNo,
                  mobileNo : result.mobileNo
            });
            result.areaOfOperation.forEach((e: any) => {
                this.aoopList.value['areaOfOperation'].push(e);
            })

      }, error => this.toastr.error(error.statusText, error.status))
  }
  onSubmit() {
    this.supplierForm.value.areaOfOperation = this.aoopList.value.areaOfOperation;

                  if(this.supplierForm.value.areaOfOperation.length > 0) {
                      this.service.updateSupplierDetails(this.supplierId, this.supplierForm.value).subscribe((result: any) => {
                            this.toastr.success(result.message, result.status);
                            this.backToList();
                      }, error => this.toastr.error(error.statusText, error.status));
                  } else {
                    this.toastr.error('Please add minimum 1 district.');
                  }
  }

  next() {
    if(this.supplierForm.valid) {
              this.showAreaOfOperationDiv = true;
    } else {
          for (const key of Object.keys(this.supplierForm.controls)) {
                if (this.supplierForm.controls[key].invalid) {
                  this.toastr.error("Enter valid inputs first", key);
          //         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          //         invalidControl.focus();
          //         invalidControl.blur();
          //         invalidControl.focus();
                  break;
              }
          }
    }
  }
  back() {
    this.showAreaOfOperationDiv = false;
  }
  backToList() {
      this.backEvent.emit();
  }

  get areaOfOperation() { return this.supplierForm.get('areaOfOperation').value; }

}
