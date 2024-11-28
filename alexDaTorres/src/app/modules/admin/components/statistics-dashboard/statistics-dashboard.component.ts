import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LegendPosition } from '@swimlane/ngx-charts';
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

  legendPosition = LegendPosition.Below; // Uso coerente della posizione

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.totalViews$ = this.analyticsService.getTotalArtworkViews();
    this.totalAddToCart$ = this.analyticsService.getTotalAddToCart();
    this.userEventsStats$ = this.analyticsService.getUserEventsStats();
    this.artworkStats$ = this.analyticsService.getArtworkStats();
    this.overallStats$ = this.analyticsService.getOverallArtworkStats().pipe(
      map((stats) =>
        stats.map((stat) => ({
          name: stat.title,
          value: stat.views + stat.addsToCart,
        }))
      )
    );
    this.locationStats$ = this.analyticsService.getLocationStats();
  }
}
