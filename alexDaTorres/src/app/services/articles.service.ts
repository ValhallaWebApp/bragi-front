import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articles: any[] = [
    {
      title:
        'L’arte del piacentino d’adozione Alex da Torres sul red carpet di Venezia',
      description:
        'Ci sarà anche un’opera del pittore “piacentino d’adozione” Alessandro Satta, meglio conosciuto come Alex da Torres, sul prestigioso tappeto rosso del Festival del cinema di Venezia. L’artista, che è un metalmeccanico di professione e vive nel nostro territorio da una quindicina d’anni, esporrà il suo dipinto “Il molo turritano” nella cerimonia di apertura della tradizionale iniziativa della “settima arte”.',
      image: '../../../assets/articles/alex_da_torres_4.jpg',
      link: 'https://www.liberta.it/luoghi/piacenza/2020/09/05/larte-del-piacentino-dadozione-alex-da-torres-sul-red-carpet-di-venezia/',
    },
    {
      title: 'Passione e colori: Alex Da Torres',
      description:
        'Si appassiona all’arte fin da tenera età fino a conseguire nel 1993 il diploma di Maestro d’arte presso l’Istituto d’arte di Sassari. Dopo un periodo di inattività, spinto dalla passione e dall’amore per la pittura, decide di riprendere il suo percorso artistico e di dare in dono una sua opera a Papa Francesco.',
      image: '../../../assets/articles/alex_da_torres_3.webp',
      link: 'https://www.catalogoartemoderna.it/artisti/alex-alex-da-torres',
    },
    {
      title: "Alex Da Torres - L'anima e il cuore dell'arte",
      description:
        'Articolo che esplora la carriera artistica di Alex Da Torres, il pittore di Porto Torres che con le sue opere esprime amore per la sua terra e la spiritualità.',
      image: '../../../assets/articles/alex_da_torres_1.JPG',
      link: 'https://www.artistrating.com/blog/pittura/alex-da-torres-alessandro-satta',
    },


    {
      title: 'Il molo turritano: tra tradizione e arte',
      description:
        'La Nuova Sardegna racconta la storia del dipinto "Il molo turritano" esposto al Festival del Cinema di Venezia e il significato che ha per l\'artista.',
      image: '../../../assets/articles/alex_da_torres_2.jpg',
      link: 'https://www.lanuovasardegna.it/sassari/cronaca/2020/09/01/news/alex-da-torres-sbarca-a-venezia-1.39257858',
    },
  ];

  getArticles(): any[] {
    return this.articles;
  }
}