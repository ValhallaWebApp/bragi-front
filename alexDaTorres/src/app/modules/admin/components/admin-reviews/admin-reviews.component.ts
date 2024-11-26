import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewDialogComponent } from 'src/app/components/dialog/edit-review-dialog/edit-review-dialog.component';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  reviews:any
  constructor(private reviewService: ReviewService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.reviewService.getAllReviews().subscribe((reviews) => {
      this.reviews = reviews;
      console.log('Recensioni caricate:', this.reviews);
    });
  }

  // Carica tutte le recensioni e imposta il filtro (se necessario)
  loadReviews(): void {
    this.reviews = this.reviewService.getAllReviews()
  }

  // Metodo per modificare una recensione
  editReview(review: any): void {
    const dialogRef = this.dialog.open(EditReviewDialogComponent, {
      width: '400px',
      data: review,
    });

    dialogRef.afterClosed().subscribe(updatedReview => {
      if (updatedReview) {
        this.reviewService.updateReview(review.reviewId, updatedReview)
          .then(() => console.log('Recensione aggiornata con successo.'))
          .catch(error => console.error('Errore durante l\'aggiornamento della recensione:', error));
      }
    });
  }

  // Metodo per eliminare una recensione
  deleteReview(reviewId: string): void {
    // this.reviewService.deleteReview(reviewId)
    //   .then(() => console.log('Recensione eliminata con successo.'))
    //   .catch(error => console.error('Errore durante l\'eliminazione della recensione:', error));
  }
}
