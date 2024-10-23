import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { FeatureGalleryComponent } from './components/feature-gallery/feature-gallery.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { JumbotronComponent } from '../shared/components/jumbotron/jumbotron.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ArtworksGalleryComponent } from '../shared/components/artworks-gallery/artworks-gallery.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroBannerComponent,
    FeatureGalleryComponent,
    TestimonialsComponent,
    JumbotronComponent,
    ArtworksGalleryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,

  ]
})
export class HomeModule { }
