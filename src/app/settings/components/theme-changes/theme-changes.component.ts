import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantSettingsService } from '../../services/tenant-settings.service';

@Component({
  selector: 'app-theme-changes',
  templateUrl: './theme-changes.component.html',
  styleUrls: ['./theme-changes.component.css']
})
export class ThemeChangesComponent {
form!: FormGroup;
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';
  tenantId = Number(localStorage.getItem('tenantId')) || 1;

  fontFamilies = ['Poppins', 'Roboto', 'Inter', 'Lato', 'Montserrat', 'Open Sans'];

colorFields = [
  { key: 'primaryColor',    label: 'Primary Color'      },
  { key: 'secondaryColor',  label: 'Secondary Color'    },
  { key: 'accentColor',     label: 'Accent Color'       },
  { key: 'backgroundColor', label: 'Background Color'   },
  { key: 'textColor',       label: 'Text Color'         },
  { key: 'navbarBgColor',   label: 'Navbar Background'  },
  { key: 'navbarTextColor', label: 'Navbar Text'        },
  { key: 'footerBgColor',   label: 'Footer Background'  },
  { key: 'footerTextColor', label: 'Footer Text'        },
  { key: 'buttonColor',     label: 'Button Color'       },
  { key: 'buttonTextColor', label: 'Button Text Color'  },
  { key: 'heroBgColor',     label: 'Hero Banner Background' }, // ✅ naya
    { key: 'promoBannerBg',   label: 'Promo Banner Background'},
  { key: 'promoBannerText', label: 'Promo Banner Text'      },
  { key: 'cardBg',          label: 'Card Background'        },
  { key: 'cardText',        label: 'Card Text Color'        },

];
  constructor(
    private fb: FormBuilder,
    private service: TenantSettingsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSettings();
  }

  initForm(): void {
    this.form = this.fb.group({
      primaryColor:    ['#ea6c2d', Validators.required],
      secondaryColor:  ['#1a1a2e', Validators.required],
      accentColor:     ['#ffffff', Validators.required],
      backgroundColor: ['#ffffff', Validators.required],
      textColor:       ['#1a1a1a', Validators.required],
      navbarBgColor:   ['#ffffff', Validators.required],  
      navbarTextColor: ['#1a1a1a', Validators.required],
      footerBgColor:   ['#0f172a', Validators.required],
      footerTextColor: ['#ffffff', Validators.required],
      buttonColor:     ['#ea6c2d', Validators.required],
      buttonTextColor: ['#ffffff', Validators.required],
      heroBgColor: ['#ffffff', Validators.required], // ✅ naya
      fontFamily:      ['Poppins', Validators.required],
          // ✅ New
    promoBannerBg:   ['#1e1a14', Validators.required],
    promoBannerText: ['#f5ede0', Validators.required],
    cardBg:          ['#ffffff', Validators.required],
    cardText:        ['#2a1f14', Validators.required],

    });
  }

  loadSettings(): void {
    this.loading = true;
    this.service.getSettings(this.tenantId).subscribe({
      next: (res) => {
        if (res.success && res.data) this.form.patchValue(res.data);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.service.getSettings(this.tenantId).subscribe({
      next: (res) => {
        const payload = {
          ...res.data,
          ...this.form.value,
          tenantId: this.tenantId
        };
        this.service.saveSettings(payload).subscribe({
          next: (r) => {
            this.successMsg = r.success ? 'Theme saved successfully!' : r.message;
            this.saving = false;
          },
          error: () => {
            this.errorMsg = 'Something went wrong!';
            this.saving = false;
          }
        });
      }
    });
  }

}
