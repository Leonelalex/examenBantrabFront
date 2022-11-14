import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              public dialogRef: MatDialogRef<DetailViewComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}
