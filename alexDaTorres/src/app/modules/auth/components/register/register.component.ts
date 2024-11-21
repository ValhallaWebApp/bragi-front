// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, public router:Router) {
    // Inizializza il form di registrazione con campi email, password e conferma password
    this.registerForm = this.fb.group({
      fullName: [ '', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required]
    }, );
    // { validators: this.passwordMatchValidator }
  }

  // Valida che la password e la conferma siano uguali
  // passwordMatchValidator(form: FormGroup) {
  //   const password = form.get('password');
  //   const confirmPassword = form.get('confirmPassword');
  //   return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  // }

  register() {
    console.log('pinooooooo')

      const {fullName, email, password } = this.registerForm.value;
      this.authService.register( email, password,fullName)
        .then((ele) => {
          console.log('Registrazione avvenuta con successo!',ele);
          if (ele.success) {
            this.router.navigate(['/auth/login'])
          }
          // Potresti voler reindirizzare l'utente dopo una registrazione avvenuta con successo
        })
        .catch((error) => {
          console.error('Errore durante la registrazione:', error);
        });

  }
}
