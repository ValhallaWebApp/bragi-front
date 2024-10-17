import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuOpen = false; // Proprietà per tracciare lo stato del menu

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Cambia lo stato del menu
    this.sidenav.toggle(); // Toggle del menu laterale
  }
}
