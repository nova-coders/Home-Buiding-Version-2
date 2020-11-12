import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { PropertyBlockComponent } from 'app/html-components/property-block/property-block.component';
import { Property } from 'app/shared/model/property.model';

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

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {
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
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
