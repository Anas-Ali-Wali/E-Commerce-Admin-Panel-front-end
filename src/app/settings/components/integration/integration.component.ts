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
 
  // Loading states
  loading       = false;
  saveLoading   = false;
  testWaLoading    = false;
  testEmailLoading = false;
 
  // Show/hide sensitive fields
  showEmailKey = false;
  showWaToken  = false;
 
  // Test inputs
  testWaPhone = '';
  testEmail   = '';
 
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
      tenantId:              [this.tenantId],
      isEmailEnabled:        [false],
      emailProvider:         [''],
      emailApiKey:           [''],
      emailSenderAddress:    [''],
      emailSenderName:       [''],
      isWhatsAppEnabled:     [false],
      whatsAppProvider:      ['Meta'],
      whatsAppToken:         [''],
      whatsAppPhoneNumberId: [''],
      whatsAppBusinessId:    ['']
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
        this.message.error('Failed to load settings.');
        this.loading = false;
      }
    });
  }
 
  // ✅ Getters for template
  get isEmailEnabled()    { return this.form.get('isEmailEnabled')?.value; }
  get isWhatsAppEnabled() { return this.form.get('isWhatsAppEnabled')?.value; }
 
  // ✅ Save
  save(): void {
    this.saveLoading = true;
    const payload = { ...this.form.value, tenantId: this.tenantId };
 
    this.integrationService.save(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('✅ Settings saved successfully!');
        } else {
          this.message.error(res.message || 'Something went wrong!');
        }
        this.saveLoading = false;
      },
      error: () => {
        this.message.error('❌ Server error!');
        this.saveLoading = false;
      }
    });
  }
 
  // ✅ Test WhatsApp
  testWhatsApp(): void {
    if (!this.testWaPhone) {
      this.message.warning('Please enter a phone number to test.');
      return;
    }
    this.testWaLoading = true;
    this.integrationService.testWhatsApp(this.tenantId, this.testWaPhone).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('✅ Test WhatsApp message sent! Check your phone.');
        } else {
          this.message.error(res.message || 'Failed to send. Check your credentials.');
        }
        this.testWaLoading = false;
      },
      error: () => {
        this.message.error('❌ Server error during test.');
        this.testWaLoading = false;
      }
    });
  }
 
  // ✅ Test Email
  testEmailFn(): void {
    if (!this.testEmail) {
      this.message.warning('Please enter an email address to test.');
      return;
    }
    this.testEmailLoading = true;
    this.integrationService.testEmail(this.tenantId, this.testEmail).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('✅ Test email sent! Check your inbox.');
        } else {
          this.message.error(res.message || 'Failed to send email.');
        }
        this.testEmailLoading = false;
      },
      error: () => {
        this.message.error('❌ Server error during test.');
        this.testEmailLoading = false;
      }
    });
  }

}
