import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-artwork-dialog',
  templateUrl: './artwork-dialog.component.html',
  styleUrls: ['./artwork-dialog.component.scss']
})
export class ArtworkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ArtworkDialogComponent>, public translate :TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
