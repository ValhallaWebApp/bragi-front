import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist-passion',
  templateUrl: './artist-passion.component.html',
  styleUrls: ['./artist-passion.component.scss']
})
export class ArtistPassionComponent {
  @Input() titleKey = ''
  @Input() descriptionKey = ''
}
