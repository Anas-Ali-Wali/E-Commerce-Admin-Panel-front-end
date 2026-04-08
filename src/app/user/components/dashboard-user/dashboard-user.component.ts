import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponseDto } from '../../interfaces/user-interfaces';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent {
  users: UserResponseDto[] = [];
  tenantId = 1; // default
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private userService: UserService) { }

  loadUsers() {
    this.userService.getUsersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe(response => {
      if (response.success && response.data) {
        this.users = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    });
  }

  onTenantChange() {
    this.currentPage = 1;
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe(response => {
        if (response.success) {
          this.loadUsers();
        }
      });
    }
  }
}
