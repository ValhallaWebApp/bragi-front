import { Component } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-mostre',
  standalone:false,
  templateUrl: './mostre.component.html',
  styleUrl: './mostre.component.scss'
})
export class MostreComponent {
  constructor(public articlesService:ArticlesService){

  }
}
