import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventTrackingService } from 'src/app/services/event-tracking.service';
import { ReviewService } from 'src/app/services/review.service';
import { FeedbackDialogComponent } from '../dialog7feedback-dialog/dialog7feedback-dialog.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-artwork-dialog',
  templateUrl: './artwork-dialog.component.html',
  styleUrls: ['./artwork-dialog.component.scss'],
})
export class ArtworkDialogComponent {
  isExpanded = false; // Variabile per gestire l'espansione delle recensioni

  reviews: any = [];
  reviewForm: FormGroup;
  ngOnInit() {
    this.reviewService.getReviewsByArtwork(this.data.id).subscribe((ele) => {
      this.reviews = ele;
    });
    this.eventTrackingService.trackArtworkView(this.data.id, this.data.title);
  }
  constructor(
    public dialogRef: MatDialogRef<ArtworkDialogComponent>,
    public translate: TranslateService,
    private fb: FormBuilder,
    private afAuth: AuthService,
    private reviewService: ReviewService,
    private eventTrackingService: EventTrackingService,
    private cartService:CartService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  // Metodo per chiudere il dialog
  onClose(): void {
    this.dialogRef.close();
  }

  // Metodo per aprire WhatsApp con un messaggio precompilato
  contactOnWhatsApp(artWork: any) {
    const message = `Ciao, sono interessato all'opera "${artWork.title}" ${
      artWork.year ? 'dell anno ' + artWork.year : ''
    }. Potrei avere maggiori dettagli?`;
    const whatsappUrl = `https://wa.me/+393427798528?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  }

  // Metodo per gestire il toggle del pannello delle recensioni
  togglePanel() {
    this.isExpanded = !this.isExpanded;
  }

  // Metodo per aprire il form di recensione (puoi implementare il form in modo simile)
  openReviewForm() {
    // Logica per aprire un form di dialog per inserire una nuova recensione
    console.log('Apri form di recensione...');
  }
  // Metodo per chiudere il dialog senza salvare
  onCancel(): void {
    this.isExpanded = false;
  }

  onReviewSubmit(review: any): void {
    console.log(review)

    // Aggiungi la recensione tramite ReviewService
    this.reviewService.addReview(review,this.data).then((ele:any) => {
      console.log('Recensione aggiunta con successo.',ele);;
    }).catch((error:any) => {
      console.error('Errore durante l\'aggiunta della recensione:', error);
    });
  }

  onReviewCancel(): void {
    this.isExpanded = false
    console.log("L'utente ha annullato la recensione.");
  }
  addToCart(artwork: any): void {
    this.cartService.addArtworkToCart(artwork).then((response) => {
      this.openFeedbackDialog(response);
    });
  }
  openFeedbackDialog(response: { success: boolean; message: string }): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: {
        message: response.message,
        success: response.success
      }
    });
  }
}
