import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  overallArtworkStats$!: Observable<{ title: string, views: number, addsToCart: number }[]>;
  overallStats$!: Observable<{ name: string, value: number }[]>;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.totalViews$ = this.analyticsService.getTotalArtworkViews();
    this.totalAddToCart$ = this.analyticsService.getTotalAddToCart();
    this.userEventsStats$ = this.analyticsService.getUserEventsStats();
    this.artworkStats$ = this.analyticsService.getArtworkStats();
   // Format the overall stats to match the format required by the bar chart.
   this.overallStats$ = this.analyticsService.getOverallArtworkStats().pipe(
    map(stats => stats.map(stat => ({
      name: stat.title,
      value: stat.views + stat.addsToCart
    })))
  );
  }
}
