import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ArtworksGalleryComponent } from './components/artworks-gallery/artworks-gallery.component';
import { ArtworksVideoComponent } from './components/artworks-video/artworks-video.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ArtworksGalleryComponent,
    ArtworksVideoComponent
  ],
  exports:[ArtworksGalleryComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
