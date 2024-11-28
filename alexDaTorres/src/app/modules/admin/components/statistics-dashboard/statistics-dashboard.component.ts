import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LegendPosition } from '@swimlane/ngx-charts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnalyticsService } from 'src/app/services/analystcs.service';

@Component({
  selector: 'app-statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  styleUrls: ['./statistics-dashboard.component.scss'],
})
export class AdminStatisticsDashboardComponent implements OnInit {
  totalViews$!: Observable<number>;
  totalAddToCart$!: Observable<number>;
  userEventsStats$!: Observable<{ loggedIn: number; anonymous: number }>;
  artworkStats$!: Observable<any[]>;
  overallStats$!: Observable<{ name: string; value: number }[]>;
  locationStats$!: Observable<{ name: string; value: number }[]>;
  filteredOverallStats$!: Observable<{ name: string; value: number }[]>;
  filteredTrendsStats$!: Observable<{ name: string, series: { name: string, value: number }[] }[]>;
  orderStats$!: Observable<{ name: string; value: number }[]>;  // Nuova variabile per gli ordini

  legendPosition = LegendPosition.Below; // Usare una variabile per gestirlo più facilmente

  filterForm!: FormGroup;

  selectedInteractionType = 'viewArtwork'; // Tipo di interazione selezionata

  constructor(private analyticsService: AnalyticsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      timePeriod: ['month']
    });

    this.totalViews$ = this.analyticsService.getTotalArtworkViews();
    this.totalAddToCart$ = this.analyticsService.getTotalAddToCart();
    this.userEventsStats$ = this.analyticsService.getUserEventsStats();
    this.artworkStats$ = this.analyticsService.getArtworkStats();
    this.orderStats$ = this.analyticsService.getOrderStats().pipe(
      map((stats) =>
        stats.map((stat) => ({
          name: stat.title,
          value: stat.orders,
        }))
      )
    );
    this.overallStats$ = this.analyticsService.getOverallArtworkStats('month').pipe(
      map((stats) =>
        stats.map((stat) => ({
          name: stat.title,
          value: stat.views + stat.addsToCart,
        }))
      )
    );
    this.locationStats$ = this.analyticsService.getLocationStats();

    // Carica i dati iniziali per le tendenze (interazione predefinita: 'viewArtwork')
    this.applyFilter(this.filterForm.get('timePeriod')?.value);

    // Aggiorna i dati al cambiare del periodo di tempo
    this.filterForm.get('timePeriod')?.valueChanges.subscribe((value) => {
      this.applyFilter(value);
    });
  }

  setInteractionType(type: string): void {
    this.selectedInteractionType = type;
    this.applyFilter(this.filterForm.get('timePeriod')?.value);
  }

  applyFilter(timePeriod: string): void {
    // Usa il tipo di interazione selezionata per filtrare le statistiche
    this.filteredTrendsStats$ = this.analyticsService.getArtworkTrendsStats(timePeriod, this.selectedInteractionType);
  }
}
