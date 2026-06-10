import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit{
  // isCollapsed = false;
  // isMobile = false;


  //   constructor(private authService: AuthService, private router: Router) {}

  // toggleSidebar() {
  //   this.isCollapsed = !this.isCollapsed;
  // }


  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/auth/login']);
  // }





  //    isCollapsed = false;
  // isMobile = false;

  // constructor(
  //   private authService: AuthService,
  //   private router: Router
  // ) {}

  // // =========================
  // // INIT
  // // =========================
  // ngOnInit(): void {
  //   this.checkScreenSize();
  // }

  // // =========================
  // // WINDOW RESIZE
  // // =========================
  // @HostListener('window:resize')
  // onResize(): void {
  //   this.checkScreenSize();
  // }

  // checkScreenSize(): void {

  //   if (window.innerWidth < 992) {
  //     this.isMobile = true;
  //     this.isCollapsed = true;
  //   } else {
  //     this.isMobile = false;
  //     this.isCollapsed = false;
  //   }

  // }

  // // =========================
  // // TOGGLE SIDEBAR
  // // =========================
  // toggleSidebar(): void {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  // // =========================
  // // AUTO CLOSE SIDEBAR
  // // WHEN MENU CLICKED
  // // =========================
  // handleMenuClick(): void {

  //   if (this.isMobile) {
  //     this.isCollapsed = true;
  //   }

  // }

  // // =========================
  // // CLOSE SIDEBAR
  // // =========================
  // closeSidebar(): void {
  //   this.isCollapsed = true;
  // }

  // // =========================
  // // LOGOUT
  // // =========================
  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/auth/login']);
  // }










isCollapsed = false;
  isMobile = false;
  settingsOpen = false;
  currentUser: any = null;

  notifCount = 0;
  recentOrders: any[] = [];
  showNotifDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();

    // ✅ user load
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }

    // ✅ polling start
    const tenantId = localStorage.getItem('tenantId');
    if (tenantId) {
      this.notifService.startPolling(Number(tenantId));
    }

    // ✅ subscribe
    this.notifService.newOrderCount$.subscribe(count => {
      this.notifCount = count;
    });

    this.notifService.recentOrders$.subscribe(orders => {
      this.recentOrders = orders;
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth < 992) {
      this.isMobile = true;
      this.isCollapsed = true;
    } else {
      this.isMobile = false;
      this.isCollapsed = false;
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  handleMenuClick(): void {
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  closeSidebar(): void {
    this.isCollapsed = true;
  }

  toggleNotif(): void {
    this.showNotifDropdown = !this.showNotifDropdown;
    if (this.showNotifDropdown) {
      this.notifService.clearNotifications();
    }
  }

  goToOrders(): void {
    this.showNotifDropdown = false;
    this.router.navigate(['/order/dashboard']);
  }

  logout(): void {
    this.notifService.stopPolling();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.notifService.stopPolling();
  }



}
