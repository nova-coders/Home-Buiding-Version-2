import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html',
})
export class LoginModalComponent implements AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false],
  });

  constructor(private loginService: LoginService, private router: Router,  private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  public cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
  }

  public login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (
            this.router.url === '/account/register' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/')
          ) {
            this.router.navigate(['']);
          }
        },
        () => (this.authenticationError = true)
      );
  }

  public register(): void {
    this.router.navigate(['/account/register']);
  }

  public requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }
}
