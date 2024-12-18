// TypeScript File for Home Component
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArtworksService } from 'src/app/services/artworks.service';

@Component({
  selector: 'app-home',
  standalone:false,
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
  artWorksArray:any = []
  constructor(public translate: TranslateService, private artWorksService:ArtworksService) {
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  ngOnInit(): void {
    this.startAutoSlide();
    this.artWorksArray = this.artWorksService.getArtworksFiltered()
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
  text = `Il mio viaggio nell'arte è stato un percorso che ha toccato mete affascinanti, attraverso mostre nelle città d'arte come Venezia, Milano e Roma. Il Festival Internazionale di Berlino è stato uno dei traguardi più significativi. La Mondadori e Arte hanno gentilmente riconosciuto il mio lavoro. "Il molo turritano" celebra Porto Torres, mentre "L'isola di Tavolara" e "Capo Comino" hanno trovato spazio nel film "Free," con attori straordinari come Sandra Milo ed Enzo Salvi. La mia arte è in costante evoluzione, alimentata dalla passione che riverso in ogni opera. `
}
