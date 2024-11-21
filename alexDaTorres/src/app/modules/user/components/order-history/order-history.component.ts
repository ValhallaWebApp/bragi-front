import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../services/order.service'; // Assumiamo che tu abbia un servizio che gestisce gli ordini

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  orders: any[] = [];

  // constructor(private orderService: OrderService) { }

  // ngOnInit(): void {
  //   this.orderService.getUserOrders().subscribe((orders) => {
  //     this.orders = orders;
  //   });
  // }
}
