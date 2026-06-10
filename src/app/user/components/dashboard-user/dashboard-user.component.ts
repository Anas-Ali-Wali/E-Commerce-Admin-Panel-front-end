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
// originalUsers: UserResponseDto[] = []; // 🔥 important
// searchText: string = '';
//   tenantId!: number;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;
  

//   constructor(
//     private userService: UserService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     // ✅ localStorage se tenantId uthao
//     const user = JSON.parse(localStorage.getItem('user')!);
//     this.tenantId = user.tenantId;
//     this.loadUsers();
//   }

//   // loadUsers() {
//   //   this.isLoading = true;
//   //   this.userService.getUsersByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
//   //     next: (response) => {
//   //       this.isLoading = false;
//   //       if (response.success && response.data) {
//   //         this.users = response.data.items;
//   //         this.totalCount = response.data.totalCount;
//   //         this.filteredUsers = [...this.users];  // ✅ copy
//   //       }
//   //     },
//   //     error: () => {
//   //       this.isLoading = false;
//   //       this.message.error('Failed to load users.');
//   //     }
//   //   });
//   // }

//   loadUsers() {
//   this.isLoading = true;

//   this.userService.getUsersByTenant(this.tenantId).subscribe({
//     next: (response) => {
//       this.isLoading = false;

//       if (response.success && response.data) {
//         this.originalUsers = response.data.items;
//         this.users = [...this.originalUsers];
//         this.totalCount = this.users.length;
//       }
//     },
//     error: () => {
//       this.isLoading = false;
//       this.message.error('Failed to load users.');
//     }
//   });
// }

//   onSearch() {
//   const value = this.searchText.toLowerCase();

//   this.users = this.originalUsers.filter(item =>
//     Object.values(item).some(val =>
//       val && val.toString().toLowerCase().includes(value)
//     )
//   );
// }

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
//       error: () => this.message.error('Server error occurred.')
//     });
//   }







  users: UserResponseDto[] = [];
  originalUsers: UserResponseDto[] = [];
  searchText = '';
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;
  Math = Math;

  // delete modal
  showDeleteModal = false;
  pendingDeleteId!: number;

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadUsers();
  }

  // get activeCount(): number {
  //   return this.originalUsers.filter(u => u.status).length;
  // }

  // get inactiveCount(): number {
  //   return this.originalUsers.filter(u => !u.status).length;
  // }

  get pagedUsers(): UserResponseDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

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
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPages(): number[] {
    const total = Math.ceil(this.users.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  confirmDelete(id: number) {
    this.pendingDeleteId = id;
    this.showDeleteModal = true;
  }

  deleteUser() {
    this.showDeleteModal = false;
    this.userService.deleteUser(this.pendingDeleteId).subscribe({
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
