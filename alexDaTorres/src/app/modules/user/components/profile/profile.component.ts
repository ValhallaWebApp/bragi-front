import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, UserProfile } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  isSubmitting = false; // Indicator to disable button during submission

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Definisci il form group utilizzando FormBuilder
    this.userProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      preferredLanguage: ['it', Validators.required],
      consentToMarketing: [false]
    });

    // Popola il form con i dati dell'utente
    this.userService.getUserProfile().subscribe((profile: any) => {
      if (profile) {
        this.userProfileForm.patchValue({
          name: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          preferredLanguage: profile.preferredLanguage,
          consentToMarketing: profile.consentToMarketing,
        });
      }
    });
  }

  saveProfile(): void {
    if (this.userProfileForm.valid) {
      this.isSubmitting = true;
      this.userService.updateUserProfile(this.userProfileForm.value).subscribe(
        () => {
          console.log('Profilo aggiornato');
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento del profilo:', error);
          this.isSubmitting = false;
        }
      );
    } else {
      console.log('Il form non è valido');
    }
  }
}
