import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
  private authService: AuthService,
  private message: NzMessageService,
  private router: Router

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
submit() {
  if (this.loginForm.invalid) return;

  this.loading = true;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      this.loading = false;
      this.message.success('Login Successful');

      // 🔥 redirect after login
      this.router.navigate(['/tenant/dashboard']);
    },
    error: () => {
      this.loading = false;
      this.message.error('Login Failed');
    }
  });
}
}
