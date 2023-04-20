import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

import { CustomValidators } from '@utils/validators';
// import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-statusl.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
  );

  formUser = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
  });

  statusUser: RequestStatus = 'init';
  status: RequestStatus = 'init';

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  /* 
  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.register(email, password, name).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.status = 'success';
        },
        error: (error) => {
          console.log(error);
          this.status = 'failed';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
 */

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(email, password, name).subscribe({
        next: () => {
          this.router.navigate(['/app/boards']);
          this.status = 'success';
        },
        error: (error) => {
          console.log(error);
          this.status = 'failed';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      if (email) {
        this.authService.isAvailable(email).subscribe({
          next: (resp) => {
            console.log(resp);
            if (resp.isAvailable) {
              this.statusUser = 'success';
              this.form.controls['email']?.setValue(email);
            } else {
              this.statusUser = 'failed';
              this.router.navigate(['/login'], { queryParams: { email } });
            }
          },
          error: (error) => {
            this.statusUser === 'failed';
          },
        });
      }
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
