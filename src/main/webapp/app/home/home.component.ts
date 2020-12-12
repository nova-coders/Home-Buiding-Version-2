import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { PropertyBlockComponent } from 'app/html-components/property-block/property-block.component';
import { Property } from 'app/shared/model/property.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  currentProperty: Property;
  propertyList: Property[];
  propertyListHtml: PropertyBlockComponent[];

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {
    this.currentProperty = new Property();
    this.currentProperty.title = 'Propiedad de prueba';
    this.propertyList = [this.currentProperty];
    this.propertyListHtml = [];
    for (let i = 0; i < this.propertyList.length; i++) {
      this.propertyListHtml.push(new PropertyBlockComponent(this.propertyList[i]));
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    console.log(this.route.url);
    if (this.isAuthenticated()) {
      const authoritiesLength = this.account?.authorities.length || 0;
      for (let i = 0; i < authoritiesLength; i++) {
        if (this.account?.authorities[i] === 'ROLE_ADMIN') {
          this.router.navigate(['homeAdmin']);
          return;
        }
      }
    }
    window.scroll(0, 0);
    const header = document.getElementById('header');
  }

  addSticky(): void {
    const header = document.getElementById('header');

    if (header != null) {
      if (this.router.url !== '') {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }

  changeFooterOnScroll(): void {
    const header = document.getElementById('header');
    const totop = document.getElementById('scroll-to-top');
    // @ts-ignore
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (this.router.url === '') {
        if (window.pageYOffset > sticky) {
          if (header != null) {
            header.classList.add('sticky');
          }
          if (totop != null) {
            totop.classList.add('show');
          }
        } else {
          if (header != null) {
            header.classList.remove('sticky');
          }
          if (totop != null) {
            totop.classList.remove('show');
          }
        }
      } else {
        // @ts-ignore
        if (!header.classList.contains('sticky')) {
          // @ts-ignore
          header.classList.add('sticky');
        }
      }
    });
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
