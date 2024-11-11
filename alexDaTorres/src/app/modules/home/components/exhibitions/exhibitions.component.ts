import { Component } from '@angular/core';

@Component({
  selector: 'app-exhibitions',
  standalone:false,
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent {
  exhibitions = [
    {
      title: 'Capocomino',
      image: '../../../assets/mostre/capocomino.jpg',
      description: 'Una descrizione di Capocomino, incluse date e dettagli dell\'evento.',
      link: 'https://maps.google.com/?q=capocomino'
    },
    {
      title: 'Isola di Tavolara',
      image: '../../../assets/mostre/isolatavolara.jpeg',
      description: 'Una descrizione dell\'evento sull\'isola di Tavolara.',
      link: 'https://maps.google.com/?q=isolatavolara'
    }
    // Aggiungi altre esposizioni qui se necessario
  ];
}
