import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtworksService } from 'src/app/services/artworks.service';
import { EditArtworkDialogComponent } from '../../shared/dialogs/edit-artwork-dialog/edit-artwork-dialog.component';
import { DeleteArtworkDialogComponent } from '../../shared/dialogs/delete-artwork-dialog/delete-artwork-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artwork-management',
  templateUrl: './artwork-management.component.html',
  styleUrls: ['./artwork-management.component.scss']
})
export class ArtworkManagementComponent {
  artworksArray: any[] = [];
  private jsonFilePath = 'assets/data/artworks-array.json';
  addAllArtworks(){
    // addArtwork()
    console.log('artworksArray',this.artworksArray)
    this.artworksArray.map((obj:any)=>{
      this.artworksService.addArtwork(obj);
    })
  }
  ngOnInit(){
    this.getArtworks()
    // this.http.get<any[]>(this.jsonFilePath).subscribe(
    //   (artworks) => {
    //     console.log('Artworks caricati dal JSON:', artworks);
    //     this.artworksArray = artworks
    //     // Qui puoi procedere con l'aggiornamento su Firebase
    //   },
    //   (error) => {
    //     console.error('Errore durante il caricamento del file JSON:', error);
    //   }
    // );

  }
  constructor(public dialog: MatDialog, private artworksService: ArtworksService, public http:HttpClient) {

  }

  getArtworks(){
    this.artworksService.getArtworks().subscribe(
      (data) => {
        this.artworksArray = data;
        // this.filteredArtworksArray = [...this.artworksArray]; // Clona i dati
        // this.isLoaded = true;
        console.log(data)
      },
      (error) => {
        console.error('Errore durante il recupero dei dati:', error);
      }
    );
  }

  editArtwork(artwork: any): void {
    const dialogRef = this.dialog.open(EditArtworkDialogComponent, {

      data: artwork
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aggiorna i dati dell'opera
        console.log(result)
        this.artworksService.updateArtwork(result);
      }
    });
  }
  addArtWork(): void {
    const dialogRef = this.dialog.open(EditArtworkDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aggiorna i dati dell'opera

         this.artworksService.addArtwork(result);
      }
    });
  }
  deleteArtwork(artwork: any): void {
    const dialogRef = this.dialog.open(DeleteArtworkDialogComponent, {data: artwork});

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // Elimina l'opera d'arte
        console.log(artwork)
        if (artwork.availability) {
          this.artworksService.disabledArtWork(artwork.id);

        }else{
          this.artworksService.enabledArtWork(artwork.id);

        }
      }
    });

  }
}
