import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../../../services/artworks.service'; // Verifica il percorso corretto
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ArtworkDialogComponent } from 'src/app/components/dialog/artwork-dialog/artwork-dialog.component';
import { CartService } from 'src/app/services/cart.service';
import { FeedbackDialogComponent } from 'src/app/components/dialog/dialog7feedback-dialog/dialog7feedback-dialog.component';

@Component({
  selector: 'app-artworks-gallery',
  standalone:false,
  templateUrl: './artworks-gallery.component.html',
  styleUrls: ['./artworks-gallery.component.scss']
})
export class ArtworksGalleryComponent implements OnInit {
  artworks:any
  constructor(public dialog: MatDialog,public artworksService: ArtworksService, public translate:TranslateService, public cartService:CartService) {}

  ngOnInit(): void {
    this.getArtworks()
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
      this.artworksService.getArtworksFiltered().subscribe(( data:any) => {
        this.artworks = data;
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
