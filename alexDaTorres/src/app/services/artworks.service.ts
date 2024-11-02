import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
   artworks:any = [
    {
      id: "-NiVKzojxE6jn7J-eEpq",
      anno: "2023",
      dimensioni: "70x100",
      nome: "I Sogni sono come il Tramonto, se aspetti svaniscono",
      tecnicaKey: "ARTWORKS.TECNICA_ACRILICO",
      flag: true,
      rating: 4,
      thumb: "assets/img/22.jpeg",
      descrizioneKey: "ARTWORKS.I_SOGNI_TRAMONTO_DESCRIZIONE",
      interpretazioneKey: "ARTWORKS.I_SOGNI_TRAMONTO_INTERPRETAZIONE"
    },
    {
      id: "-NiVKzopBq2Lbkt7o2fq",
      anno: "2023",
      dimensioni: "100x70",
      nome: "Un Sogno nel Cassetto",
      tecnicaKey: "ARTWORKS.TECNICA_ACRILICO",
      flag: true,
      rating: 3,
      thumb: "assets/img/1.jpg",
      descrizioneKey: "ARTWORKS.UN_SOGNO_CASSETTO_DESCRIZIONE",
      interpretazioneKey: "ARTWORKS.UN_SOGNO_CASSETTO_INTERPRETAZIONE"
    },
    {
      id: "-NiVKzoucwaRg8D9WxhE",
      anno: "2019",
      dimensioni: "110x90",
      nome: "Ritornerò a volare",
      tecnicaKey: "ARTWORKS.TECNICA_ACRILICO",
      flag: true,
      rating: 5,
      thumb: "assets/img/5.jpg",
      descrizioneKey: "ARTWORKS.RITORNO_VOLARE_DESCRIZIONE",
      interpretazioneKey: "ARTWORKS.RITORNO_VOLARE_INTERPRETAZIONE"
    },
    {
      id: "-NiVKzp4UL2_ilaCcSKB",
      anno: "N/A",
      dimensioni: "120x80",
      nome: "E Viva la gioia di vivere",
      tecnicaKey: "ARTWORKS.TECNICA_ACRILICO",
      flag: true,
      rating: 2,
      thumb: "assets/img/17.JPG",
      descrizioneKey: "ARTWORKS.E_VIVA_LA_GIOIA_DESCRIZIONE",
      interpretazioneKey: "ARTWORKS.E_VIVA_LA_GIOIA_INTERPRETAZIONE"
    },
    {
      id: "-NiVKzp2v5MIteO1TTWl",
      anno: "2022",
      dimensioni: "120x100",
      nome: "Fai volare i tuoi sogni",
      tecnicaKey: "ARTWORKS.TECNICA_ACRILICO",
      flag: true,
      rating: 4,
      thumb: "assets/img/15.JPG",
      descrizioneKey: "ARTWORKS.FAI_VOLARE_SOGNI_DESCRIZIONE",
      interpretazioneKey: "ARTWORKS.FAI_VOLARE_SOGNI_INTERPRETAZIONE"
    },
    {
      id: "-NiVKzp3pO338QN9ActW",
      anno: "N/A",
      dimensioni: "150x100",
      nome: "Il giardino degli illuminati",
      tecnicaKey: "ARTWORKS.TECNICA_ACRILICO",
      flag: true,
      rating: 5,
      thumb: "assets/img/16.JPG",
      descrizioneKey: "ARTWORKS.IL_GIARDINO_ILLUMINATI_DESCRIZIONE",
      interpretazioneKey: "ARTWORKS.IL_GIARDINO_ILLUMINATI_INTERPRETAZIONE"
    }
  ];

  constructor() {}

  getArtworks() {
    console.log(this.artworks)
    return this.artworks;
  }

  getArtworkByTitle(titleKey: string): any | undefined {
    return this.artworks.find((artwork: any) => artwork.titleKey === titleKey);
  }

  getArtworksByCategory(category: string): any[] {
    return this.artworks.filter((artwork: any) => artwork.category === category);
  }
}
