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
  contactOnWhatsApp(artWork:any){
  // Prepara il messaggio dinamico per WhatsApp
  const message = `Ciao, sono interessato all'opera "${artWork.title}" ${artWork.year ? 'dell anno' + artWork.year: ''}. Potrei avere maggiori dettagli?`;

  // Crea l'URL per aprire WhatsApp con il messaggio
  const whatsappUrl = `https://wa.me/+393427798528?text=${encodeURIComponent(message)}`;

  // Apri la finestra di WhatsApp con il link generato
  window.open(whatsappUrl, '_blank');
  }
}
