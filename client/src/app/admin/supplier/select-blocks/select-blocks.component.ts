import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-select-blocks',
  templateUrl: './select-blocks.component.html',
  styleUrls: ['./select-blocks.component.css']
})
export class SelectBlocksComponent implements OnInit {

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
  ) { }

  @Input() supplierForm: any;
  @Output() newItemEvent = new EventEmitter<string>();

  selectedDistrict: any;
  districtList: any;
  
  blockList: any;
  blockListColumns: string[] = ['slNo', 'blockCode', 'blockName', 'select'];
  selection: any = new SelectionModel<any>(true, []);
  @ViewChild(MatSort) sort: any;
  @ViewChild('paginatorRef') paginator: any;

  ngOnInit(): void {

    this.selectedDistrict = '';
    this.loadDistrict();
    this.districtList = [];
    this.blockList = new MatTableDataSource([]);
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
          this.newItemEvent.emit();
          this.selection = new SelectionModel<any>(true, []);
        } else {
          this.toastr.error('Please select minimum one block');
      }
  }
  applyBlockListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.blockList.filter = filterValue.trim().toLowerCase();
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
