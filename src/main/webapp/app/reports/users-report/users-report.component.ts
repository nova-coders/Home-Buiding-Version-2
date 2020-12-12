import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'jhi-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.scss'],
})
export class UsersReportComponent implements OnInit {
  public userList: UserAccount[] = [];
  public initPage: number = 1;
  constructor(private userAccountService: UserAccountService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userAccountService.getAll().subscribe(res => {
      console.log(res.body);
      this.userList = res.body as UserAccount[];
    });
    this.route.queryParams.subscribe((params: Params) => {});
  }
}
