import { Component, OnInit } from '@angular/core';
import { ProfessionalProfileUserService } from 'app/entities/professional-profile-user/professional-profile-user.service';
import { ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { UserAccount } from 'app/shared/model/user-account.model';

@Component({
  selector: 'jhi-list-professional',
  templateUrl: './list-professional.component.html',
  styleUrls: ['./list-professional.component.scss'],
})
export class ListProfessionalComponent implements OnInit {
  public proffesionalList: UserAccount[] = [];
  public initPage: number = 1;
  constructor(public profService: ProfessionalProfileUserService, private route: ActivatedRoute, public userService: UserAccountService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.profService.findAll().subscribe(res => {
        this.proffesionalList = res.body as UserAccount[];
        console.log('************************************');
        console.log(this.proffesionalList);
        for (var i = 0; i < this.proffesionalList.length; i++) {}
      });
    });
  }
}
