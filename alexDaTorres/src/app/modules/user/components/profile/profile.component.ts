import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          fullName: user.displayName,
          email: user.email
        });
      }
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      // Implementa la logica di aggiornamento del profilo
    }
  }
}
