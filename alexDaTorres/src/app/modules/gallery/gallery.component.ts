import { CartService } from './../../services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { ArtworksService } from 'src/app/services/artworks.service';
import { ArtworkDialogComponent } from 'src/app/components/dialog/artwork-dialog/artwork-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/components/dialog/dialog7feedback-dialog/dialog7feedback-dialog.component';

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
      this.artworksService.getArtworksFiltered().subscribe(
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
  constructor(private cartService:CartService,private artworksService: ArtworksService,public translate: TranslateService,public dialog: MatDialog) {
    this.filteredArtworksArray = this.artworksArray;
  }

  filtered() {
    // Filtra per tecnica
    let filteredArray:any[] = this.artworksArray;

    if (this.selectedTecnica) {
      filteredArray = filteredArray.filter((artWork:any) =>
        artWork.tequenicue?.toLowerCase().includes(this.selectedTecnica.toLowerCase())
      );
    }

    // Filtra per titolo
    if (this.searchTitle) {
      filteredArray = filteredArray.filter((artWork:any) =>
        artWork.title.toLowerCase().includes(this.searchTitle.toLowerCase())
      );
    }

    // Filtra per anno
    if (this.searchYear) {
      filteredArray = filteredArray.filter(
        (artWork:any) => artWork.year == this.searchYear
      );
    }

    // Ordina in base alla selezione
    if (this.selectedOrder === '1') {
      // Data crescente
      filteredArray = filteredArray.sort((a:any, b:any) => a.year - b.year);
    } else if (this.selectedOrder === '2') {
      // Data decrescente
      filteredArray = filteredArray.sort((a:any, b:any) => b.year - a.year);
    }

    // Aggiorna l'array di opere d'arte filtrato
    this.filteredArtworksArray = filteredArray;
  }
  // Metodo per assegnare un rating (numero di stelle) a un'opera d'arte
  rateArtwork(artwork: any, rating: number) {
    if (!artwork.rating) {
      // Inizializzare il campo rating se non esiste
      artwork.rating = {
        average: 0,
        totalVotes: 0,
        totalRatingPoints: 0
      };
    }

    // Aggiorna i valori di rating
    artwork.rating.totalVotes += 1;
    artwork.rating.totalRatingPoints += rating;
    artwork.rating.average = parseFloat(
      (artwork.rating?.totalRatingPoints / artwork.rating.totalVotes).toFixed(1)
    );

    // Salva le modifiche su Firebase
    this.artworksService.updateArtwork(artwork)
      .then(() => {
        console.log(`Artwork con ID: ${artwork.id} aggiornato con successo.`);
      })
      .catch((error) => {
        console.error(`Errore durante l'aggiornamento del rating dell'artwork con ID: ${artwork.id}`, error);
      });
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
      width: '80vw',
      data: artwork,
    });
  }
  addToCart(artwork: any): void {
    this.cartService.addArtworkToCart(artwork).then((response) => {
      this.openFeedbackDialog(response);
    });
  }
  openFeedbackDialog(response: { success: boolean; message: string }): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: {
        message: response.message,
        success: response.success
      }
    });
  }
}
