import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { ArtworksService } from 'src/app/services/artworks.service';
import { ArtworkDialogComponent } from 'src/app/components/dialog/artwork-dialog/artwork-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  artworksArray:any = [];
  filteredArtworksArray:any = [];
  isLoaded: boolean = false;
  // Filtri
  selectedTecnica: string = '';
  searchTitle: string = '';
  searchYear: number | any = null;
  selectedOrder: string = '0';
  ngOnInit(){
      this.artworksService.getArtworks().subscribe(
        (data) => {
          this.artworksArray = data;
          this.filteredArtworksArray = [...this.artworksArray]; // Clona i dati
          this.isLoaded = true;
          console.log(data)
        },
        (error) => {
          console.error('Errore durante il recupero dei dati:', error);
        }
      );
  }
  constructor(private artworksService: ArtworksService,public translate: TranslateService,public dialog: MatDialog) {

    this.filteredArtworksArray = this.artworksArray;
  }

  filtered() {
    // Filtra per tecnica
    let filteredArray:any[] = this.artworksArray;

    if (this.selectedTecnica) {
      filteredArray = filteredArray.filter((artWork:any) =>
        artWork.tecnica?.toLowerCase().includes(this.selectedTecnica.toLowerCase())
      );
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
        (artWork:any) => artWork.anno.toString().includes(this.searchYear?.toLowerCase())
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
  // Metodo per assegnare un rating (numero di stelle) a un'opera d'arte
  rateArtwork(artworkId: any, rating: number) {
    // Trova l'opera d'arte corrispondente e assegna il rating
    const artwork = this.artworksArray.find((art: any) => art.id === artworkId);
    if (artwork) {
      artwork.rating = rating; // Assegna il voto (rating) all'opera
    }
    this.filtered(); // Applica nuovamente i filtri per aggiornare la vista
  }

  // Metodo per resettare tutti i filtri ai valori predefiniti
  resetFilters() {
    this.selectedTecnica = '';
    this.searchTitle = '';
    this.searchYear = null;
    this.selectedOrder = '0';
    this.filteredArtworksArray = this.artworksArray; // Ripristina l'array originale
  }

  openArtworkDialog(artwork: any): void {
    const dialogRef = this.dialog.open(ArtworkDialogComponent, {
      width: '400px',
      data: artwork,
    });
  }
}
