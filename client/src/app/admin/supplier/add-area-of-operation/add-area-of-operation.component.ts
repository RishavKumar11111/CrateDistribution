import { Component, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-add-area-of-operation',
  templateUrl: './add-area-of-operation.component.html',
  styleUrls: ['./add-area-of-operation.component.css']
})
export class AddAreaOfOperationComponent implements OnInit {

  constructor(
  ) { }
  @Input() supplierForm: any;
  @ViewChild('listComponent') listComponent: any;
  ngOnInit(): void {
  }

  updateTable = () => {
    this.listComponent.updateTable()
  }

}
