// TypeScript File for Home Component
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    { image: 'assets/artist/artist.jpg', caption: 'Artwork 1' },
    { image: 'assets/artist/artist2.jpg', caption: 'Artwork 2' },
    { image: 'assets/artist/artist-interview.jpg', caption: 'Artwork 3' }
  ];
  currentSlide = 0;
  dropdownOpen = false;
  currentLanguage: string;
  languages = ['en', 'it', 'fr'];

  constructor(public translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  switchLanguage(language: string): void {
    if (this.currentLanguage !== language) {
      this.translate.use(language);
      this.currentLanguage = language;
      this.closeDropdown();
    }
  }

  getFlag(language: string): string {
    switch (language) {
      case 'en':
        return 'assets/icon/flag-gb.svg';
      case 'it':
        return 'assets/icon/flag-it.svg';
      case 'fr':
        return 'assets/icon/flag-fr.svg';
      default:
        return 'assets/icon/flag-gb.svg';
    }
  }

  getLanguageName(language: string): string {
    switch (language) {
      case 'en':
        return 'English';
      case 'it':
        return 'Italiano';
      case 'fr':
        return 'Français';
      default:
        return 'English';
    }
  }

  startAutoSlide(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
