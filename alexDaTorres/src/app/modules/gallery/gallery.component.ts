import { Component } from '@angular/core';
import { ArtworksService } from 'src/app/services/artworks.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  artworksArray:any = [];
  filteredArtworksArray:any = [];

  // Filtri
  selectedTecnica: string = '';
  searchTitle: string = '';
  searchYear: number | null = null;
  selectedOrder: string = '0';

  constructor(private artworksService: ArtworksService) {
    this.artworksArray = this.artworksService.getArtworks();
    this.filteredArtworksArray = this.artworksArray;
  }

  filtered() {
    // Filtra per tecnica
    let filteredArray:any[] = this.artworksArray;

    if (this.selectedTecnica) {
      filteredArray = filteredArray.filter((artWork:any) =>
        artWork.tecnica?.toLowerCase().includes(this.selectedTecnica.toLowerCase())
      );
      console.log(this.selectedTecnica,)
    }

    // Filtra per titolo
    if (this.searchTitle) {
      filteredArray = filteredArray.filter((artWork:any) =>
        artWork.nome.toLowerCase().includes(this.searchTitle.toLowerCase())
      );
    }

    // Filtra per anno
    if (this.searchYear) {
      filteredArray = filteredArray.filter(
        (artWork:any) => artWork.anno.toString().includes(this.searchYear?.toString())
      );
    }

    // Ordina in base alla selezione
    if (this.selectedOrder === '1') {
      // Data crescente
      filteredArray = filteredArray.sort((a:any, b:any) => a.anno - b.anno);
    } else if (this.selectedOrder === '2') {
      // Data decrescente
      filteredArray = filteredArray.sort((a:any, b:any) => b.anno - a.anno);
    }

    // Aggiorna l'array di opere d'arte filtrato
    this.filteredArtworksArray = filteredArray;
  }
}
