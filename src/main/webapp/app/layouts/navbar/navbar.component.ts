import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
import { Property } from 'app/shared/model/property.model';
import { CustomPropertyService } from 'app/global-services/custom-property.service';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent implements OnInit {
  myProperties: Property[] = [];
  authSubscription?: Subscription;
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  swaggerEnabled?: boolean;
  version: string;
  header: null;
  account: Account | null = null;
  userAccount: UserAccount;
  isInvalid = '';
  constructor(
    private loginService: LoginService,
    private customPropertyService: CustomPropertyService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    public router: Router,
    private servicePaymentService: ServicePaymentService
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
    this.userAccount = new UserAccount();
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationStart &&
        !this.router.url.startsWith('/auth/login') &&
        !this.router.url.startsWith('/account/register') &&
        !this.router.url.startsWith('/account/activate?') &&
        !this.router.url.startsWith('/account/reset/finish?') &&
        !this.router.url.startsWith('/account/reset/')
      ) {
        window.localStorage.setItem('previousUrl', this.router.url);
      }
    });

    let idAcount: any;
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.isAuthenticated()) {
        this.servicePaymentService.getUserAccount().subscribe(response => {
          this.userAccount = <UserAccount>response.body;
          idAcount = this.userAccount.id;
          this.customPropertyService.getPropertiesInSaleByUserId(idAcount).subscribe(data => {
            this.myProperties = data;
          });
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
  public validatePackage(): void {
    console.log(this.userAccount.publishingPackage, this.myProperties);
    if (this.userAccount.publishingPackage?.cantPropertySale! >= this.myProperties.length) {
      this.isInvalid = '';
      this.router.navigate(['/property/new']);
    } else {
      this.isInvalid = 'exampleModalCenter';
    }
  }
}
