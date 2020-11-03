import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAccount } from 'app/shared/model/user-account.model';

@Component({
  selector: 'jhi-user-account-detail',
  templateUrl: './user-account-detail.component.html',
})
export class UserAccountDetailComponent implements OnInit {
  userAccount: IUserAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => (this.userAccount = userAccount));
  }

  previousState(): void {
    window.history.back();
  }
}
