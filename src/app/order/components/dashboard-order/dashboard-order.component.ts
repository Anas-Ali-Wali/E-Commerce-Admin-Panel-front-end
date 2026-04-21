import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponseDto, OrderUpdateRequestDto } from '../../interfaces/order-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.css']
})
export class DashboardOrderComponent {
//  orders: OrderResponseDto[] = [];
//   tenantId = 1;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;

//   constructor(
//     private orderService: OrderService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     this.loadOrders();
//   }

//   loadOrders() {
//     this.isLoading = true;
//     this.orderService.getOrdersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
//       next: (response) => {
//         this.isLoading = false;
//         if (response.success && response.data) {
//           this.orders = response.data.items;
//           this.totalCount = response.data.totalCount;
//         }
//       },
//       error: (err) => {
//         this.isLoading = false;
//         console.error('Load Error:', err);
//         this.message.error('Failed to load orders.');
//       }
//     });
//   }

//   onTenantChange() {
//     this.currentPage = 1;
//     this.loadOrders();
//   }

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.loadOrders();
//   }

//   getStatusColor(status: string): string {
//     switch (status) {
//       case 'Completed': return 'success';
//       case 'Pending':   return 'warning';
//       case 'Cancelled': return 'error';
//       default:          return 'default';
//     }
//   }

//   deleteOrder(id: number) {
//     this.orderService.deleteOrder(id).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.message.success('Order deleted successfully');
//           this.loadOrders();
//         } else {
//           this.message.error('Failed to delete order');
//         }
//       },
//       error: (err) => {
//         console.error('Delete Error:', err);
//         this.message.error('Server error occurred. Please try again.');
//       }
//     });
//   }


orders: OrderResponseDto[] = [];
originalOrders: OrderResponseDto[] = []; // 🔥 important
searchText: string = '';
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;

  constructor(
    private orderService: OrderService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // ✅ localStorage se tenantId uthao
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadOrders();
  }

  // loadOrders() {
  //   this.isLoading = true;
  //   this.orderService.getOrdersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
  //     next: (response) => {
  //       this.isLoading = false;
  //       if (response.success && response.data) {
  //         this.orders = response.data.items;
  //         this.totalCount = response.data.totalCount;
  //       }
  //     },
  //     error: () => {
  //       this.isLoading = false;
  //       this.message.error('Failed to load orders.');
  //     }
  //   });
  // }

  loadOrders() {
  this.isLoading = true;

  this.orderService.getAllOrdersByTenant(this.tenantId).subscribe({
    next: (response) => {
      this.isLoading = false;

      if (response.success && response.data) {
        this.originalOrders = response.data.items;
        this.orders = [...this.originalOrders];
        this.totalCount = this.orders.length; // frontend pagination
      }
    },
    error: () => {
      this.isLoading = false;
      this.message.error('Failed to load orders.');
    }
  });
}

onSearch() {
  const value = this.searchText.toLowerCase();

  this.orders = this.originalOrders.filter(item =>
    Object.values(item).some(val =>
      val && val.toString().toLowerCase().includes(value)
    )
  );
}

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadOrders();
  }


  updateStatus(order: OrderResponseDto, newStatus: string): void {
    const payload: OrderUpdateRequestDto = {
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      totalAmount: order.totalAmount,
      status: newStatus
    };

    this.orderService.updateOrder(order.orderId, payload).subscribe({
      next: (response) => {
        if (response.success) {
          order.status = newStatus;
          this.message.success('Status updated successfully');
        } else {
          this.message.error('Failed to update status');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending':   return 'warning';
      case 'Cancelled': return 'error';
      default:          return 'default';
    }
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.success('Order deleted successfully');
          this.loadOrders();
        } else {
          this.message.error('Failed to delete order');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

}
