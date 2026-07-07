import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { environment } from 'src/Environment/environment';
// import { environment } from 'src/Environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.apiUrl;
  private pollingInterval = 30000; // 30 sec
  private pollSub: Subscription | null = null;

  // ye sidebar mein subscribe hoga
  newOrderCount$ = new BehaviorSubject<number>(0);
  recentOrders$ = new BehaviorSubject<any[]>([]);

  private lastCheckedTime: string = new Date().toISOString();
  private seenOrderIds = new Set<number>();

  constructor(private http: HttpClient) {}

  startPolling(tenantId: number) {
    this.fetchOrders(tenantId); // pehli baar turant
    this.pollSub = interval(this.pollingInterval).subscribe(() => {
      this.fetchOrders(tenantId);
    });
  }

  private fetchOrders(tenantId: number) {
    this.http.get<any>(`${this.apiUrl}/order/tenant/${tenantId}/all`).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const orders: any[] = res.data;

          // naye orders jo pehle nahi dekhe
          const newOrders = orders.filter(o => !this.seenOrderIds.has(o.orderId));

          if (newOrders.length > 0) {
            newOrders.forEach(o => this.seenOrderIds.add(o.orderId));
            this.newOrderCount$.next(newOrders.length);
            // last 5 recent orders dropdown mein
            this.recentOrders$.next(orders.slice(0, 5));
          }
        }
      },
      error: (err) => console.error('Notification polling error:', err)
    });
  }

  clearNotifications() {
    this.newOrderCount$.next(0);
  }

  stopPolling() {
    this.pollSub?.unsubscribe();
  }

  ngOnDestroy() {
    this.stopPolling();
  }
}
