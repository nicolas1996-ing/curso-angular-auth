/*
  normalmente al usuario se le envia un link donde se adjunta la url que lo redirecciona a esta ruta 
  https://..../recovery-password/?<token> con el token de acceso. El componente lee el valor del token
  y con ello permite entrar a la ruta, de otra manera redirecciona al usuario al login nuevamente. En este
  caso nosotros mismo debemos llamar la ruta via url con el token que nos retorna la peticion que se hace con 
  el formulario de forgot-password.
*/

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

import { CustomValidators } from '@utils/validators';
// import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-statusl.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  tokenRecovery: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatRoute: ActivatedRoute,
    private router: Router
  ) {
    this.geTokenFromHeaders();
  }

  geTokenFromHeaders() {
    this.activatRoute.paramMap.subscribe({
      next: (params) => {
        const tokenRecovery = params.get('tokenRecovery');
        if (tokenRecovery) {
          this.tokenRecovery = tokenRecovery;
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {},
    });
  }
  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService
        .changePassword(this.tokenRecovery, newPassword)
        .subscribe({
          next: (resp) => {
            this.status = 'success';
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.status = 'failed';
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
