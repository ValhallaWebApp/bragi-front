import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

// Components
import { ArtworkDialogComponent } from './artwork-dialog/artwork-dialog.component';
import { EditArtworkDialogComponent } from 'src/app/modules/admin/shared/dialogs/edit-artwork-dialog/edit-artwork-dialog.component';
import { EditReviewDialogComponent } from './edit-review-dialog/edit-review-dialog.component';
import { FeedbackDialogComponent } from './dialog7feedback-dialog/dialog7feedback-dialog.component';
import { DeleteArtworkDialogComponent } from './../../modules/admin/shared/dialogs/delete-artwork-dialog/delete-artwork-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { ReviewFormComponent } from '../forms/review-form/review-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIcon,
    MatExpansionModule,
    TranslateModule
  ],
  declarations: [
    ArtworkDialogComponent,
    EditArtworkDialogComponent,
    EditReviewDialogComponent,
    FeedbackDialogComponent,
    DeleteArtworkDialogComponent,
    ReviewFormComponent
  ],
  exports: [
    ArtworkDialogComponent,
    EditArtworkDialogComponent,
    EditReviewDialogComponent,
    FeedbackDialogComponent,
    DeleteArtworkDialogComponent,
    ReviewFormComponent
  ]
})
export class DialogModule { }
