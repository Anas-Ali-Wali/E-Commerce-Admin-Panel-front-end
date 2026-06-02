import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

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





     isCollapsed = false;
  isMobile = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.checkScreenSize();
  }

  // =========================
  // WINDOW RESIZE
  // =========================
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

  // =========================
  // TOGGLE SIDEBAR
  // =========================
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // =========================
  // AUTO CLOSE SIDEBAR
  // WHEN MENU CLICKED
  // =========================
  handleMenuClick(): void {

    if (this.isMobile) {
      this.isCollapsed = true;
    }

  }

  // =========================
  // CLOSE SIDEBAR
  // =========================
  closeSidebar(): void {
    this.isCollapsed = true;
  }

  // =========================
  // LOGOUT
  // =========================
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
