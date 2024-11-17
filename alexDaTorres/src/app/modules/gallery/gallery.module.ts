import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { ArtworkCardComponent } from './components/artwork-card/artwork-card.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { SortingDropdownComponent } from './components/sorting-dropdown/sorting-dropdown.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '@angular/cdk/dialog';
import { ArtworkDialogComponent } from 'src/app/components/dialog/artwork-dialog/artwork-dialog.component';


@NgModule({
  declarations: [
    GalleryComponent,
    ArtworkCardComponent,
    FilterPanelComponent,
    SortingDropdownComponent,
    ArtworkDialogComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIcon,
    MatButtonModule,
    FormsModule,
    TranslateModule,
    DialogModule,
    MatButtonModule
  ]
})
export class GalleryModule { }
