import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService
  ) { }
  @Input() supplierForm: any;
  @ViewChild('supplierFormId') el: any;
  isDuplicateWONo: any;

  ngOnInit(): void {
    this.isDuplicateWONo = false;
  }
  checkWorkOrderExistance() {
    if(this.workOrderNo.value == '') {
            this.isDuplicateWONo = false;
    } else {
      this.service.checkWONoDuplicate(this.workOrderNo.value).subscribe(result => {
        this.isDuplicateWONo = result.status;
      }, error => this.toastr.error(error.statusText, error.status));
            
    }
  }

  get panNo() { return this.supplierForm.get('panNo'); }
  get mobileNo() { return this.supplierForm.get('mobileNo'); }
  get workOrderNo() { return this.supplierForm.get('workOrderNo'); }
  get firmName() { return this.supplierForm.get('firmName'); }
  get emailId() { return this.supplierForm.get('emailId'); }
  get itemQuantity() { return this.supplierForm.get('itemQuantity'); }
  get GSTN() { return this.supplierForm.get('GSTN'); }

}
