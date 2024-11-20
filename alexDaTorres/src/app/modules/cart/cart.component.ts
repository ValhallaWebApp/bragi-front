import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/components/dialog7feedback-dialog/dialog7feedback-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Ottieni gli elementi del carrello quando il componente viene inizializzato
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(artworkId: string): void {
    this.cartService.removeArtworkFromCart(artworkId).then((response) => {
      this.openFeedbackDialog(response);
    });
  }

  clearCart(): void {
    this.cartService.clearCart().then((response) => {
      this.openFeedbackDialog(response);
    });
  }

  addToCart(artwork: any): void {
    this.cartService.addArtworkToCart(artwork).then((response) => {
      this.openFeedbackDialog(response);
    });
  }

  openFeedbackDialog(response: { success: boolean; message: string }): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: {
        message: response.message,
        success: response.success
      }
    });
  }
}
