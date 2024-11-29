import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialogComponent {
  reviewForm: FormGroup;
  isLoggedIn: boolean = false;
  loggedUserEmail: string = ''; // Per memorizzare l'email dell'utente loggato

  // Output per emettere l'evento quando viene inviata una recensione
  @Output() submitReview = new EventEmitter<any>();
  @Output() cancelReview = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService,public dialogRef: MatDialogRef<ReviewDialogComponent>,
    public dialog: MatDialog,private reviewService:ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.maxLength(200)]],
      email: [{ value: '', disabled: true }, [Validators.email]] // Email disabilitato di default
    });
  }

  ngOnInit(): void {
    // Verifica se l'utente è loggato
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn && user.email) {
        // Memorizza l'email dell'utente loggato e popola il campo email
        this.loggedUserEmail = user.email;
        this.reviewForm.get('email')?.setValue(this.loggedUserEmail);
        this.reviewForm.get('email')?.disable(); // Mantieni il campo disabilitato
      } else {
        // Se l'utente non è loggato, il campo email è obbligatorio e abilitato
        this.reviewForm.get('email')?.setValidators([Validators.required, Validators.email]);
        this.reviewForm.get('email')?.enable();
        this.reviewForm.get('email')?.updateValueAndValidity();
      }
    });
  }

  // Metodo per inviare la recensione
  onSubmit(review:any): void {
    if (this.reviewForm.valid) {
      // Emetti i valori del form inclusi i campi disabilitati
      const formData = {
        ...this.reviewForm.getRawValue(),
        email: this.isLoggedIn ? this.loggedUserEmail : this.reviewForm.get('email')?.value,
      };
        // Aggiungi la recensione tramite ReviewService
    this.reviewService.addReview(review,this.data).then((ele:any) => {
      console.log('Recensione aggiunta con successo.',ele);;
    }).catch((error:any) => {
      console.error('Errore durante l\'aggiunta della recensione:', error);
    });
      this.submitReview.emit(formData);
      this.reviewForm.reset();
    }
  }

  // Metodo per annullare la recensione
  onCancel(): void {
    this.cancelReview.emit();
    this.reviewForm.reset();
    this.dialog.closeAll()
  }
}
