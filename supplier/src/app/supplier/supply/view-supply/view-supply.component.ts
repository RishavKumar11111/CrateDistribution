import { SupplierService } from './../../../services/supplier.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-view-supply',
  templateUrl: './view-supply.component.html',
  styleUrls: ['./view-supply.component.css']
})
export class ViewSupplyComponent implements OnInit {
  result: any;
  details: any;

  constructor(private service: SupplierService) { }

  ngOnInit(): void {
    this.service.getSupplyList().subscribe(data =>
      {
        this.result = JSON.parse(JSON.stringify(data));
        // console.log(data);
      });
      this.details = {};
  }

}
