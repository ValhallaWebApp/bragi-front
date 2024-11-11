import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  standalone:false,
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  slides = [
    { image: 'assets/artist/artist-interview.jpg', caption: 'Artwork 1' },
    { image: 'assets/artist/artist.jpg', caption: 'Artwork 2' },
    { image: 'assets/artist/artist2.jpg', caption: 'Artwork 3' }
  ];
  currentSlideIndex = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia slide ogni 5 secondi
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }
}
