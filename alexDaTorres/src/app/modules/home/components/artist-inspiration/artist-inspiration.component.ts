import { Component } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-artist-inspiration',
  standalone:false,
  templateUrl: './artist-inspiration.component.html',
  styleUrls: ['./artist-inspiration.component.scss']
})
export class ArtistInspirationComponent {
  articles:any[] = []
  constructor(public articleService:ArticlesService){

  }
  ngOnInit(){
    this.articles = this.articleService.getArticles()
  }
}
