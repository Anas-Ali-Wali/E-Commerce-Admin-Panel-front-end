import { Component } from '@angular/core';
import { TenantIntegrationService } from '../../services/tenant-integration.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent {
form!: FormGroup;
  tenantId: number = 0;
  loading = false;
  saveLoading = false;

    // ✅ YE ADD KARO
  showEmailKey = false;
  showWaToken  = false;


  constructor(
    private fb: FormBuilder,
    private integrationService: TenantIntegrationService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.tenantId = user.tenantId;
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.form = this.fb.group({
      tenantId:             [this.tenantId],
      isEmailEnabled:       [false],
      emailProvider:        [''],
      emailApiKey:          [''],
      emailSenderAddress:   [''],
      emailSenderName:      [''],
      isWhatsAppEnabled:    [false],
      whatsAppProvider:     [''],
      whatsAppToken:        [''],
      whatsAppPhoneNumberId:[''],
      whatsAppBusinessId:   ['']
    });
  }

  loadData(): void {
    this.loading = true;
    this.integrationService.getByTenant(this.tenantId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.form.patchValue(res.data);
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get isEmailEnabled() { return this.form.get('isEmailEnabled')?.value; }
  get isWhatsAppEnabled() { return this.form.get('isWhatsAppEnabled')?.value; }

  save(): void {
    this.saveLoading = true;
    const payload = { ...this.form.value, tenantId: this.tenantId };

    this.integrationService.save(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('Settings saved successfully!');
        } else {
          this.message.error(res.message || 'Something went wrong!');
        }
        this.saveLoading = false;
      },
      error: () => {
        this.message.error('Server error!');
        this.saveLoading = false;
      }
    });
  }

}
