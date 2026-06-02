// import { Component, OnInit } from '@angular/core';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { TenantSettingsService } from '../../services/tenant-settings.service';

// export interface CardDesign {
//   id: string;
//   label: string;
//   type: 'product' | 'category';
// }

// export const PRODUCT_CARD_STYLES: CardDesign[] = [
//   { id: 'fashion', label: 'Fashion',    type: 'product' },
//   { id: 'badge',   label: 'Badge Grid', type: 'product' },
//   { id: 'minimal', label: 'Minimal',    type: 'product' },
// ];

// export const CATEGORY_CARD_STYLES: CardDesign[] = [
//   { id: 'layout-4col', label: '4 Column', type: 'category' },
//   { id: 'layout-3col', label: '3 Column', type: 'category' },
//   { id: 'layout-2col', label: '2 Column', type: 'category' },
// ];

// @Component({
//   selector: 'app-card-style',
//   templateUrl: './card-style.component.html',
//   styleUrls: ['./card-style.component.css']
// })
// export class CardStyleComponent implements OnInit {
//   productStyles  = PRODUCT_CARD_STYLES;
//   categoryStyles = CATEGORY_CARD_STYLES;

//   selectedProductStyle  = 'fashion';   // ✅ default
//   selectedCategoryStyle = 'layout-4col'; // ✅ default — 'square' nahi tha valid
//   currentSettings: any  = {};
//   saving = false;

//   constructor(
//     private settingsService: TenantSettingsService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit(): void {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     this.settingsService.getSettings(user.tenantId).subscribe({
//       next: (res) => {
//         if (res.success && res.data) {
//           this.currentSettings       = res.data;
//           this.selectedProductStyle  = res.data.cardStyle         || 'fashion';    // ✅ 'classic' nahi
//           this.selectedCategoryStyle = res.data.categoryCardStyle || 'layout-4col'; // ✅ 'square' nahi
//         }
//       }
//     });
//   }

//   selectProduct(id: string)  { this.selectedProductStyle  = id; }
//   selectCategory(id: string) { this.selectedCategoryStyle = id; }

//   getLayoutCount(id: string): number[] {
//     if (id === 'layout-4col') return [1, 2, 3, 4];
//     if (id === 'layout-3col') return [1, 2, 3];
//     if (id === 'layout-2col') return [1, 2];
//     return [1, 2, 3, 4];
//   }

//   save(): void {
//     this.saving = true;
//     const user = JSON.parse(localStorage.getItem('user')!);

//     const payload: any = {
//       ...this.currentSettings,
//       tenantId:          user.tenantId,
//       cardStyle:         this.selectedProductStyle,
//       categoryCardStyle: this.selectedCategoryStyle,
//     };

//     this.settingsService.saveSettings(payload).subscribe({
//       next: (r) => {
//         this.saving = false;
//         if (r.success) {
//           this.message.success('Card styles saved!');
//           this.currentSettings = {
//             ...this.currentSettings,
//             cardStyle:         this.selectedProductStyle,
//             categoryCardStyle: this.selectedCategoryStyle,
//           };
//         } else {
//           this.message.error('Save failed.');
//         }
//       },
//       error: () => { this.saving = false; this.message.error('Server error.'); }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TenantSettingsService } from '../../services/tenant-settings.service';

export interface CardDesign {
  id: string;
  label: string;
  type: 'product' | 'category';
}

export const PRODUCT_CARD_STYLES: CardDesign[] = [
  { id: 'fashion',  label: 'Square',      type: 'product' },
  { id: 'badge',    label: 'Fashion Tall', type: 'product' },
];

export const CATEGORY_CARD_STYLES: CardDesign[] = [
  { id: 'layout-4col', label: '4 Column', type: 'category' },
  { id: 'layout-3col', label: '3 Column', type: 'category' },
  { id: 'layout-2col', label: '2 Column', type: 'category' },
];

@Component({
  selector: 'app-card-style',
  templateUrl: './card-style.component.html',
  styleUrls: ['./card-style.component.css']
})
export class CardStyleComponent implements OnInit {
  productStyles  = PRODUCT_CARD_STYLES;
  categoryStyles = CATEGORY_CARD_STYLES;

  selectedProductStyle  = 'fashion';
  selectedCategoryStyle = 'layout-4col';
  currentSettings: any  = {};
  saving = false;

  constructor(
    private settingsService: TenantSettingsService,
    private message: NzMessageService
  ) {}

  // ✅ tenantId multiple sources se lo
  private getTenantId(): number | null {
    // 1. 'tenantId' key directly
    const direct = localStorage.getItem('tenantId');
    if (direct) return Number(direct);

    // 2. 'user' object se
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        if (user?.tenantId) return Number(user.tenantId);
      } catch {}
    }

    // 3. JWT token se decode karo
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const id = payload['TenantId'] || payload['tenantId'];
        if (id) return Number(id);
      } catch {}
    }

    return null;
  }

  ngOnInit(): void {
    const tenantId = this.getTenantId();
    if (!tenantId) {
      this.message.error('Session expired. Please login again.');
      return;
    }

    this.settingsService.getSettings(tenantId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.currentSettings       = res.data;
          this.selectedProductStyle  = res.data.cardStyle         || 'fashion';
          this.selectedCategoryStyle = res.data.categoryCardStyle || 'layout-4col';
        }
      }
    });
  }

  selectProduct(id: string)  { this.selectedProductStyle  = id; }
  selectCategory(id: string) { this.selectedCategoryStyle = id; }

  getLayoutCount(id: string): number[] {
    if (id === 'layout-4col') return [1, 2, 3, 4];
    if (id === 'layout-3col') return [1, 2, 3];
    if (id === 'layout-2col') return [1, 2];
    return [1, 2, 3, 4];
  }

  save(): void {
    const tenantId = this.getTenantId();
    if (!tenantId) {
      this.message.error('Session expired. Please login again.');
      return;
    }

    this.saving = true;

    const payload: any = {
      ...this.currentSettings,
      tenantId,
      cardStyle:         this.selectedProductStyle,
      categoryCardStyle: this.selectedCategoryStyle,
    };

    this.settingsService.saveSettings(payload).subscribe({
      next: (r) => {
        this.saving = false;
        if (r.success) {
          this.message.success('Card styles saved!');
          this.currentSettings = {
            ...this.currentSettings,
            cardStyle:         this.selectedProductStyle,
            categoryCardStyle: this.selectedCategoryStyle,
          };
        } else {
          this.message.error('Save failed.');
        }
      },
      error: () => { this.saving = false; this.message.error('Server error.'); }
    });
  }
}