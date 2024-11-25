import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  reviewForm: FormGroup;
  isLoggedIn: boolean = false;
  loggedUserEmail: string = ''; // Per memorizzare l'email dell'utente loggato

  // Output per emettere l'evento quando viene inviata una recensione
  @Output() submitReview = new EventEmitter<any>();
  @Output() cancelReview = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
  onSubmit(): void {
    if (this.reviewForm.valid) {
      // Emetti i valori del form inclusi i campi disabilitati
      const formData = {
        ...this.reviewForm.getRawValue(),
        email: this.isLoggedIn ? this.loggedUserEmail : this.reviewForm.get('email')?.value,
      };
      this.submitReview.emit(formData);
      this.reviewForm.reset();
    }
  }

  // Metodo per annullare la recensione
  onCancel(): void {
    this.cancelReview.emit();
    this.reviewForm.reset();
  }
}
