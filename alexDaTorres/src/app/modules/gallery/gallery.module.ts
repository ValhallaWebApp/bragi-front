import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { ArtworkCardComponent } from './components/artwork-card/artwork-card.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { SortingDropdownComponent } from './components/sorting-dropdown/sorting-dropdown.component';


@NgModule({
  declarations: [
    GalleryComponent,
    ArtworkCardComponent,
    FilterPanelComponent,
    SortingDropdownComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }
