import {
  Component,
} from '@angular/core';

import { ArtworksService } from 'src/app/services/artworks.service';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent  {

   artworksArray = this.artworksService.getArtworks()

  constructor(private artworksService:ArtworksService){

  }

   filtered(s:any){
     console.log(s)
   }

 }
