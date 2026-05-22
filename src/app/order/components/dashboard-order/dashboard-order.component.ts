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
orders: OrderResponseDto[] = [];
  originalOrders: OrderResponseDto[] = [];
  searchText: string = '';
  activeFilter: string = 'All';
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;

  // ✅ Sab statuses
  statusOptions = [
    { value: 'Pending',          label: '🕐 Pending' },
    { value: 'Confirmed',        label: '✅ Confirmed' },
    { value: 'Processing',       label: '⚙️ Processing' },
    { value: 'Packed',           label: '📦 Packed' },
    { value: 'Shipped',          label: '🚚 Shipped' },
    { value: 'Out For Delivery', label: '🛵 Out For Delivery' },
    { value: 'Delivered',        label: '🎉 Delivered' },
    { value: 'Completed',        label: '✔️ Completed' },
    { value: 'Cancelled',        label: '❌ Cancelled' },
    { value: 'Returned',         label: '↩️ Returned' },
    { value: 'Refunded',         label: '💰 Refunded' },
    { value: 'Failed',           label: '🚫 Failed' },
  ];

  // ✅ Filter tabs
  filterTabs = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(
    private orderService: OrderService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getAllOrdersByTenant(this.tenantId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.originalOrders = response.data as any;
          this.applyFilter();
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load orders.');
      }
    });
  }

  // ✅ Filter by status tab
  filterByStatus(status: string) {
    this.activeFilter = status;
    this.searchText = '';
    this.applyFilter();
  }

  applyFilter() {
    let filtered = [...this.originalOrders];

    if (this.activeFilter !== 'All') {
      filtered = filtered.filter(o => o.status === this.activeFilter);
    }

    if (this.searchText) {
      const val = this.searchText.toLowerCase();
      filtered = filtered.filter(item =>
        Object.values(item).some(v => v && v.toString().toLowerCase().includes(val))
      );
    }

    this.orders = filtered;
    this.totalCount = filtered.length;
  }

  onSearch() {
    this.applyFilter();
  }

  onPageChange(page: number) {
    this.currentPage = page;
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
          this.message.success('✅ Status updated — notification sent!');
        } else {
          this.message.error('Failed to update status');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

  // ✅ Status badge color
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Pending':          'gold',
      'Confirmed':        'blue',
      'Processing':       'geekblue',
      'Packed':           'purple',
      'Shipped':          'cyan',
      'Out For Delivery': 'orange',
      'Delivered':        'lime',
      'Completed':        'success',
      'Cancelled':        'error',
      'Returned':         'magenta',
      'Refunded':         'volcano',
      'Failed':           'red',
    };
    return colors[status] || 'default';
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