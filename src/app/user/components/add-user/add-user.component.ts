import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCreateRequestDto } from '../../interfaces/user-interfaces';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      tenantId: [0, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required],
      role: ['User']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const request: UserCreateRequestDto = this.userForm.value;
      this.userService.createUser(request).subscribe(response => {
        if (response.success) {
          alert('User created successfully');
          this.userForm.reset();
        } else {
          alert('Error: ' + response.message);
        }
      });
    }
  }
}
