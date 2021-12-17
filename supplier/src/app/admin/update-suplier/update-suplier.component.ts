import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';

@Component({
  selector: 'app-update-suplier',
  templateUrl: './update-suplier.component.html',
  styleUrls: ['./update-suplier.component.css']
})
export class UpdateSuplierComponent implements OnInit {

 
  submit = false;
  suplierDetails:any;
  // suplierForm: any;
 

  constructor(private service:MasterService,private router:Router, private route:ActivatedRoute) { }
  suplierForm=new FormGroup({
    firmID:new FormControl("",Validators.required),
    firmName:new FormControl("",Validators.required),
    itemQuantity:new FormControl("",Validators.required),
    workOrder_number:new FormControl("",Validators.required),
    mobile_no:new FormControl("",Validators.required),
    GSTN:new FormControl("",Validators.required),
    aadhar_no:new FormControl("",Validators.required)
  });
  
  getsupplierDetails(suplierData :any) {
    this.service.supplierDetails(suplierData)
      .subscribe(data => {
        this.suplierDetails = data;
        
        this.suplierForm.setValue({
          firmID: this.suplierDetails.firmID,
          firmName: this.suplierDetails.firmName,
          itemQuantity: this.suplierDetails.itemQuantity,
          workOrder_number: this.suplierDetails.workOrder_number,
          mobile_no: this.suplierDetails.mobile_no,
          GSTN: this.suplierDetails.GSTN,
          aadhar_no: this.suplierDetails.aadhar_no
          
        });
      })
    }
    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.getsupplierDetails(params.data);
      });
    }
    onSubmit() {
      this.submit = true;
      const firmID = this.suplierForm.value.firmID;
      const suplierBody = this.suplierForm.value;
      // console.log(suplierBody);
      
      // if (this.suplierForm.invalid) {
      //   console.log("return");
      //   return;
      // } else {
        this.service.updatesuplierDetails( firmID , suplierBody ).subscribe(result => {
            alert("Supplier details update Successfully")
           console.log(result);
          })
        
        }
          
      
    //  }

}
