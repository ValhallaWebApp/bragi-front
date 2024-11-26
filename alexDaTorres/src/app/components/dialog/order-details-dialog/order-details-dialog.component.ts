import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent {
  order: any;

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.order;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
