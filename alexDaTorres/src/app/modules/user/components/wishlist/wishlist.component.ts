import { Component, OnInit } from '@angular/core';
// import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  wishlistItems: any[] = [];

  // constructor(private wishlistService: WishlistService) { }

  // ngOnInit(): void {
  //   this.wishlistService.getWishlist().subscribe((items) => {
  //     this.wishlistItems = items;
  //   });
  // }

  removeFromWishlist(itemId: string): void {
    // this.wishlistService.removeItem(itemId);
  }
}
