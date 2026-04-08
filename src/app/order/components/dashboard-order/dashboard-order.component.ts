import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponseDto } from '../../interfaces/order-interfaces';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.css']
})
export class DashboardOrderComponent {
  orders: OrderResponseDto[] = [];
  tenantId = 1;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private orderService: OrderService) { }

  loadOrders() {
    this.orderService.getOrdersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe(response => {
      if (response.success && response.data) {
        this.orders = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    });
  }

  onTenantChange() {
    this.currentPage = 1;
    this.loadOrders();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadOrders();
  }

  deleteOrder(id: number) {
    if (confirm('Are you sure?')) {
      this.orderService.deleteOrder(id).subscribe(response => {
        if (response.success) {
          this.loadOrders();
        }
      });
    }
  }
}
