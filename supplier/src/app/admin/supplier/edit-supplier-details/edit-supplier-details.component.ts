import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-supplier-details',
  templateUrl: './edit-supplier-details.component.html',
  styleUrls: ['./edit-supplier-details.component.css']
})
export class EditSupplierDetailsComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  supplierForm: any;  
  aoopList: any;
  showAreaOfOperationDiv: any;
  supplierId: any;
  ngOnInit(): void {
      this.route.paramMap.subscribe((params: any) => {
            this.supplierId = params.params.userid;
            this.loadSupplierDetails();
      });
      this.showAreaOfOperationDiv = false;

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
                            this.router.navigate(['/admin/viewSupplier'])
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

  get areaOfOperation() { return this.supplierForm.get('areaOfOperation').value; }

}
