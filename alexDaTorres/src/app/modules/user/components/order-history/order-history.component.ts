import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private authService: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {
    // Recupera gli ordini dell'utente corrente
    this.orderService.getOrdersByUser().subscribe((orders: any[]) => {
      this.orders = orders;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Spedito':
        return 'status-shipped';
      case 'Annullato':
        return 'status-cancelled';
      case 'In Attesa':
        return 'status-pending';
      default:
        return 'status-default';
    }
  }
}
