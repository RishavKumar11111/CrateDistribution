import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-area-of-operation-list',
  templateUrl: './area-of-operation-list.component.html',
  styleUrls: ['./area-of-operation-list.component.css']
})
export class AreaOfOperationListComponent implements OnInit {

  constructor() { }
  
  areaOfOperationList: any;
  @Input() supplierForm: any;
  aooListColumns: string[] = ['slNo', 'district', 'block', 'remove'];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) aooPaginator: any;
  ngOnInit(): void {
    this.areaOfOperationList = new MatTableDataSource([]);
    this.areaOfOperationList.data = this.areaOfOperation.value;
    setTimeout(() => {
      this.areaOfOperationList.sort = this.sort;
      this.areaOfOperationList.paginator = this.aooPaginator;
      this.areaOfOperationList._updateChangeSubscription();
    }, 300)
  }

  removeAreaOfOperation(index: any) {
    this.supplierForm.value.areaOfOperation.splice(index, 1);
    this.areaOfOperationList._updateChangeSubscription();
  }
  applyAOOListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.areaOfOperationList.filter = filterValue.trim().toLowerCase();
    this.areaOfOperationList._updateChangeSubscription();
  }
  get areaOfOperation() { return this.supplierForm.get('areaOfOperation'); }
  public updateTable() { 
    setTimeout(() => {
      this.areaOfOperationList.sort = this.sort;
      this.areaOfOperationList.paginator = this.aooPaginator;
      this.areaOfOperationList._updateChangeSubscription();
    }, 300)
  }
}
