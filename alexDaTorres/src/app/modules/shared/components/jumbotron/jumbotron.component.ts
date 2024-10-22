import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  isAnimating: boolean = false;

  ngOnInit(): void {
    // Iniziamo l'animazione automaticamente dopo un breve ritardo quando il componente è caricato
    setTimeout(() => {
      this.startAnimation();
    }, 500);
  }

  startAnimation(): void {
    this.isAnimating = true;
  }
}
