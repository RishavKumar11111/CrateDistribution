import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-view-supply-list',
  templateUrl: './view-supply-list.component.html',
  styleUrls: ['./view-supply-list.component.css']
})
export class ViewSupplyListComponent implements OnInit {
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
