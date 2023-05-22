import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-statusl.model';
import { AuthService } from '@services/auth.service';
// import { AuthService } from '../../../../services/auth.service';
// import { RequestStatus } from '../../../../models/request-statusl.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activeRouter: ActivatedRoute
  ) {
    this.setForm();
  }

  setForm() {
    this.activeRouter.queryParamMap.subscribe((params) => {
      const email = params.get('email');
      if (email) {
        this.form.controls['email'].setValue(email);
      }
      this.form.controls['password'].setValue('');
    });
  }

  login() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
        next: (resp) => {
          // console.log(resp);
          this.router.navigate(['/app/']);
          this.status = 'success';
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
