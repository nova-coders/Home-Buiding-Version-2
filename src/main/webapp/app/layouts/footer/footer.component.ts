import { Component } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.scss'],
})
export class FooterComponent {
  constructor(private accountService: AccountService, public router: Router) {}
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
}
