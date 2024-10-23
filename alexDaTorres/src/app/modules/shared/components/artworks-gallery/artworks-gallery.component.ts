import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../../../services/artworks.service'; // Verifica il percorso corretto
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artworks-gallery',
  templateUrl: './artworks-gallery.component.html',
  styleUrls: ['./artworks-gallery.component.scss']
})
export class ArtworksGalleryComponent implements OnInit {

  constructor(public artworksService: ArtworksService, public translate:TranslateService) {}

  ngOnInit(): void {}
    // Placeholder function to handle view details button click
     viewArtworkDetails(artwork:any) {
      console.log('Viewing details for artwork:', artwork);
    }
    getTranslation(key: any): Observable<any> {
      console.log(key,this.translate.get(key))
      return this.translate.get(key);
    }

}
