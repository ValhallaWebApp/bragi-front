import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('dropdown', { static: true }) dropdownRef!: ElementRef;
  menuOpen = false;
  currentLanguage: string = 'it';
  dropdownOpen = false;
  languages = ['en', 'it', 'fr'];
  domain = '';
  private documentClickListener!: () => void;

  constructor(public translate: TranslateService, private renderer: Renderer2) {}

  ngOnInit() {
    this.domain = window.location.hostname;
    this.switchLanguage(this.currentLanguage);

    // Listener per chiudere il dropdown se si clicca al di fuori
    this.documentClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (this.dropdownOpen && !this.dropdownRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.sidenav.toggle();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(event: Event, language: string) {
    event.stopPropagation(); // Evita che l'evento si propaghi e chiuda il dropdown immediatamente
    this.switchLanguage(language);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
    this.dropdownOpen = false;
  }

  getFlag(lang: string): string {
    return `../../../assets/icon/flag-${lang}.svg`;
  }

  getLanguageName(lang: string): string {
    switch (lang) {
      case 'en': return 'English';
      case 'it': return 'Italiano';
      case 'fr': return 'Français';
      default: return '';
    }
  }
}
