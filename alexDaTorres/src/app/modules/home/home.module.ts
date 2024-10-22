import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { FeatureGalleryComponent } from './components/feature-gallery/feature-gallery.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { JumbotronComponent } from '../shared/components/jumbotron/jumbotron.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
    HeroBannerComponent,
    FeatureGalleryComponent,
    TestimonialsComponent,
    JumbotronComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule
  ]
})
export class HomeModule { }
