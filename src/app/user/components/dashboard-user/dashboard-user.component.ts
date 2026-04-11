import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponseDto } from '../../interfaces/user-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent {
users: UserResponseDto[] = [];
originalUsers: UserResponseDto[] = []; // 🔥 important
searchText: string = '';
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // ✅ localStorage se tenantId uthao
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadUsers();
  }

  // loadUsers() {
  //   this.isLoading = true;
  //   this.userService.getUsersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
  //     next: (response) => {
  //       this.isLoading = false;
  //       if (response.success && response.data) {
  //         this.users = response.data.items;
  //         this.totalCount = response.data.totalCount;
  //         this.filteredUsers = [...this.users];  // ✅ copy
  //       }
  //     },
  //     error: () => {
  //       this.isLoading = false;
  //       this.message.error('Failed to load users.');
  //     }
  //   });
  // }

  loadUsers() {
  this.isLoading = true;

  this.userService.getUsersByTenant(this.tenantId).subscribe({
    next: (response) => {
      this.isLoading = false;

      if (response.success && response.data) {
        this.originalUsers = response.data.items;
        this.users = [...this.originalUsers];
        this.totalCount = this.users.length;
      }
    },
    error: () => {
      this.isLoading = false;
      this.message.error('Failed to load users.');
    }
  });
}

  onSearch() {
  const value = this.searchText.toLowerCase();

  this.users = this.originalUsers.filter(item =>
    Object.values(item).some(val =>
      val && val.toString().toLowerCase().includes(value)
    )
  );
}

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.success('User deleted successfully');
          this.loadUsers();
        } else {
          this.message.error('Failed to delete user');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

}
