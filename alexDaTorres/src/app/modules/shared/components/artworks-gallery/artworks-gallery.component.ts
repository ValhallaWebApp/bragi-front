import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../../../services/artworks.service'; // Verifica il percorso corretto
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ArtworkDialogComponent } from 'src/app/components/dialog/artwork-dialog/artwork-dialog.component';

@Component({
  selector: 'app-artworks-gallery',
  standalone:false,
  templateUrl: './artworks-gallery.component.html',
  styleUrls: ['./artworks-gallery.component.scss']
})
export class ArtworksGalleryComponent implements OnInit {
  artworks:any
  constructor(public dialog: MatDialog,public artworksService: ArtworksService, public translate:TranslateService) {}

  ngOnInit(): void {
  }
    // Placeholder function to handle view details button click
     viewArtworkDetails(artwork:any) {
      console.log('Viewing details for artwork:', artwork);
    }
    getTranslation(key: any): Observable<any> {
      console.log(key,this.translate.get(key))
      return this.translate.get(key);
    }
    openArtworkDialog(artwork: any): void {
      const dialogRef = this.dialog.open(ArtworkDialogComponent, {
        width: '400px',
        data: artwork,
      });
    }
    getArtworks(){
      this.artworksService.getArtworks().subscribe(( data:any) => {
        this.artworks = data;
      });
    }
}
