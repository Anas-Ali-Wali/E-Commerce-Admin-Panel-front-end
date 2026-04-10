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
// users: UserResponseDto[] = [];
//   tenantId = 1;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;

//   constructor(
//     private userService: UserService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     this.loadUsers();
//   }

//   loadUsers() {
//     this.isLoading = true;
//     this.userService.getUsersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
//       next: (response) => {
//         this.isLoading = false;
//         if (response.success && response.data) {
//           this.users = response.data.items;
//           this.totalCount = response.data.totalCount;
//         }
//       },
//       error: (err) => {
//         this.isLoading = false;
//         console.error('Load Error:', err);
//         this.message.error('Failed to load users.');
//       }
//     });
//   }

//   onTenantChange() {
//     this.currentPage = 1;
//     this.loadUsers();
//   }

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.loadUsers();
//   }

//   deleteUser(id: number) {
//     this.userService.deleteUser(id).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.message.success('User deleted successfully');
//           this.loadUsers();
//         } else {
//           this.message.error('Failed to delete user');
//         }
//       },
//       error: (err) => {
//         console.error('Delete Error:', err);
//         this.message.error('Server error occurred. Please try again.');
//       }
//     });
//   }


users: UserResponseDto[] = [];
  filteredUsers: UserResponseDto[] = [];  // ✅ search ke liye
  searchName = '';
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

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.users = response.data.items;
          this.totalCount = response.data.totalCount;
          this.filteredUsers = [...this.users];  // ✅ copy
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load users.');
      }
    });
  }

  // ✅ Name se search/filter
  onSearch() {
    const keyword = this.searchName.toLowerCase().trim();
    if (!keyword) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(u =>
        u.name.toLowerCase().includes(keyword)
      );
    }
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
