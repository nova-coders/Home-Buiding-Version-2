import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/core/language/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Subscription } from 'rxjs';
import { Account } from 'app/core/user/account.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { stringify } from 'querystring';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent implements OnInit {
  authSubscription?: Subscription;
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  swaggerEnabled?: boolean;
  version: string;
  header: null;
  account: Account | null = null;
  userAccount: UserAccount;

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    public router: Router,
    public route: ActivatedRoute,
    private servicePaymentService: ServicePaymentService
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
    this.userAccount = new UserAccount();
    //Navbar automatically fix css

    this.router.events.subscribe((params: Params) => {
      var css = 'font-size:24px;color:red;';
      console.log('%cCurrent url: ' + this.router.url, css);
      console.log(params);
      const header = document.querySelector('header');

      if (header != null) {
        if (this.router.url == '/') {
          console.log('Sticky has been removed!');
          header.classList.remove('sticky');
        } else {
          console.log('Sticky has been added!');
          header.classList.add('sticky');
        }
      } else {
        console.log('Header is null!');
      }
    });
  }
  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.isAuthenticated()) {
        this.servicePaymentService.getUserAccount().subscribe(response => {
          this.userAccount = <UserAccount>response.body;
        });
      }
    });

    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }
}
