// modules/auth/components/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        console.log('Registrazione avvenuta con successo');
      })
      .catch((error) => {
        console.error('Errore durante la registrazione:', error);
      });
  }
}
