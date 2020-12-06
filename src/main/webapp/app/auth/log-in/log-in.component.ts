import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

import { LoginService } from '../../core/login/login.service';
@Component({
  selector: 'jhi-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false],
  });
  public previousUrl: string = '';

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          console.log('URL = ' + this.router.url);
          if (
            this.router.url === '/account/register' ||
            this.router.url === '/auth/login' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/') ||
            this.router.url.startsWith('/see-auction')
          ) {
            console.log('previousUrl');
            let previousUrl: string = window.localStorage.getItem('previousUrl') || '/';
            console.log(previousUrl);
            this.router.navigate([previousUrl]);
          } else {
            console.log('Hola marvin no redirect');
          }
        },
        () => (this.authenticationError = true)
      );
  }

  register(): void {
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }
}
