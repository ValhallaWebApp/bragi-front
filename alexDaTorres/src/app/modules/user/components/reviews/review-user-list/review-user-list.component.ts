import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewDialogComponent } from 'src/app/components/dialog/edit-review-dialog/edit-review-dialog.component';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-review-user-list',
  templateUrl: './review-user-list.component.html',
  styleUrls: ['./review-user-list.component.scss']
})
export class ReviewUserListComponent implements OnInit {
  reviews$: Observable<any[]> | undefined; // Observable per le recensioni dell'utente

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Ottieni l'utente corrente e carica le recensioni
    this.reviews$ = this.authService.getUser().pipe(
      switchMap(user => {
        if (user) {
          return this.reviewService.getReviewsByUser(user.uid);
        } else {
          return [];
        }
      })
    );
  }

  editReview(review: any): void {
    // Apre il dialog di modifica
    const dialogRef = this.dialog.open(EditReviewDialogComponent, {
      width: '400px',
      data: {
        rating: review.rating,
        comment: review.comment
      }
    });

    // Quando il dialog si chiude, aggiorna la recensione
    dialogRef.afterClosed().subscribe((updatedReview) => {
      if (updatedReview) {
        // Aggiorna la recensione nel database usando il ReviewService
        this.reviewService.updateReview(review.id, updatedReview)
          .then(() => {
            console.log('Recensione aggiornata con successo');
          })
          .catch((error) => {
            console.error('Errore durante l\'aggiornamento della recensione:', error);
          });
      }
    });
  }

  deleteReview(reviewId: string): void {
    // Chiama il servizio per eliminare la recensione
    this.reviewService.deleteReview(reviewId)
      .then(() => {
        console.log('Recensione eliminata con successo');
      })
      .catch((error) => {
        console.error('Errore durante l\'eliminazione della recensione:', error);
      });
  }
}
