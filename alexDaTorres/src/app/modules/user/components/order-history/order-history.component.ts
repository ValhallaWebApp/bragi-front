import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private authService: AuthService, private orderService:OrderService) {}

  ngOnInit(): void {
    // Recupera gli ordini dell'utente corrente
    this.orderService.getOrdersByUser().subscribe((ele:any)=>{
      console.log(ele)
      this.orders = ele
    });
  }
}
