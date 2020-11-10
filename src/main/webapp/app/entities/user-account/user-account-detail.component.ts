import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUserAccount } from 'app/shared/model/user-account.model';

@Component({
  selector: 'jhi-user-account-detail',
  templateUrl: './user-account-detail.component.html',
})
export class UserAccountDetailComponent implements OnInit {
  userAccount: IUserAccount | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => (this.userAccount = userAccount));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
