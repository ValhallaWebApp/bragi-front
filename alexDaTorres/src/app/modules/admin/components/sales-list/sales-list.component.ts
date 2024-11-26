import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { OrderDetailsDialogComponent } from 'src/app/components/dialog/order-details-dialog/order-details-dialog.component';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  sales: any[] = [];
  filteredSales: any[] = [];
  selectedStatus: string = '';

  constructor(private salesService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.salesService.getOrders().subscribe((sales) => {
      this.sales = sales;
      this.filteredSales = sales;
    });
  }

  // Filtra le vendite in base allo stato selezionato
  filterSales(): void {
    if (this.selectedStatus) {
      this.filteredSales = this.sales.filter(sale => sale.status === this.selectedStatus);
    } else {
      this.filteredSales = this.sales;
    }
  }

// Aggiorna lo stato di un ordine
updateStatus(sale: any, newStatus: string): void {
  // Apri la dialog di conferma
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      message: `Sei sicuro di voler aggiornare lo stato dell'ordine a "${newStatus}"?`
    }
  });

  // Dopo che la dialog è stata chiusa
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Se l'utente ha confermato
      this.salesService.updateOrderStatus(sale.id, newStatus)
        .then(() => {
          // Feedback positivo
          console.log('Stato dell\'ordine aggiornato con successo.');
          sale.status = newStatus; // Aggiorna lo stato localmente dopo la conferma
        })
        .catch(error => {
          // Gestione degli errori
          console.error('Errore durante l\'aggiornamento dello stato dell\'ordine:', error);
        });
    }
  });
}

  // Apri la dialog per vedere i dettagli dell'ordine
  viewDetails(sale: any): void {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '500px',
      data: {
        order: sale
      }
    });
  }
}
