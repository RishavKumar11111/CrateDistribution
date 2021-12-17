import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-add-area-of-operation',
  templateUrl: './add-area-of-operation.component.html',
  styleUrls: ['./add-area-of-operation.component.css']
})
export class AddAreaOfOperationComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
  ) { }
  @Input() supplierForm: any;
  selectedDistrict: any;
  districtList: any;
  blockList: any;
  areaOfOperationList: any;
  blockListColumns: string[] = ['slNo', 'blockCode', 'blockName', 'select'];
  aooListColumns: string[] = ['slNo', 'district', 'block', 'remove'];
  selection: any = new SelectionModel<any>(true, []);
  @ViewChild(MatSort) sort: any;
  @ViewChild('paginatorRef') paginator: any;
  @ViewChild('paginatorRefAOF') aooPaginator: any;
  ngOnInit(): void {
      this.selectedDistrict = '';
      this.loadDistrict();
      this.districtList = [];
      this.blockList = new MatTableDataSource([]);
      this.areaOfOperationList = new MatTableDataSource([]);
      this.areaOfOperationList.data = this.areaOfOperation.value;
      this.areaOfOperationList.paginator = this.aooPaginator;
  }
  loadDistrict() {
    this.service.getDistrictList().subscribe(result => {
      this.districtList = result;
    }, error => this.toastr.error(error.statusText, error.status));
  }
  loadBlock() {
        this.service.getBlockList(this.selectedDistrict.districtCode).subscribe((result: any) => {
              let selectedList = []
              for(let i = 0; i < result.length; i++) {
                for(let j = 0; j < this.supplierForm.value.areaOfOperation.length; j++) {
                  if(this.supplierForm.value.areaOfOperation[j].districtCode === result[i].districtCode && this.supplierForm.value.areaOfOperation[j].blockCode === result[i].blockCode) {
                    // result[i].isChecked = this.supplierForm.value.areaOfOperation[j].isChecked ? true : false;
                    if(this.supplierForm.value.areaOfOperation[j].isChecked) {
                      selectedList.push(result[i]);
                    } else {
                      result[i].isChecked = false;
                    }
                  }
                }
              }

          this.selection = new SelectionModel<any>(true, selectedList);
              this.blockList.data = result;
              this.blockList.sort = this.sort;
              this.blockList.paginator = this.paginator;
        }, error => this.toastr.error(error.statusText, error.status));
  }
  assignDistrict() {
      if(this.selection._selected.length > 0) {
        let i = this.areaOfOperation.value.length;
        while( i-- ) {
                if(this.areaOfOperation.value[i].districtCode === this.selectedDistrict.districtCode) {
                  this.supplierForm.value['areaOfOperation'].splice(i, 1);
                }
        }
        this.selection._selected.forEach((e: any) => {
            e.districtName = this.selectedDistrict.districtName;
            e.isChecked = true;
            this.supplierForm.value.areaOfOperation.push(e);
          });
          this.selectedDistrict = '';
          this.blockList.data = [];
          this.areaOfOperationList.data = this.supplierForm.value.areaOfOperation;
          this.areaOfOperationList.paginator = this.aooPaginator;
          this.selection = new SelectionModel<any>(true, []);
        } else {
          this.toastr.error('Please select minimum one block');
      }
  }
  removeAreaOfOperation(index: any) {
    this.supplierForm.value.areaOfOperation.splice(index, 1);
    this.areaOfOperationList._updateChangeSubscription();
  }
  applyBlockListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.blockList.filter = filterValue.trim().toLowerCase();
  }
  applyAOOListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.areaOfOperationList.filter = filterValue.trim().toLowerCase();
  }




  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.blockList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.blockList.data.forEach((row: any) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



  get areaOfOperation() { return this.supplierForm.get('areaOfOperation'); }


}
