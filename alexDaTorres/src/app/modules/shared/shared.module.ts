import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ArtworksGalleryComponent } from './components/artworks-gallery/artworks-gallery.component';
import { ArtworksVideoComponent } from './components/artworks-video/artworks-video.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [

    ArtworksVideoComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule { }
