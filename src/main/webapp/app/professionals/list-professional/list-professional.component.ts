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
  public proffesionalListFull: UserAccount[] = [];
  public filteringMode: boolean = false;
  public userFound: boolean = false;
  public initPage: number = 1;
  public currentProffesionalFilter: number = -1;
  constructor(public profService: ProfessionalProfileUserService, private route: ActivatedRoute, public userService: UserAccountService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      window.scroll(0, 0);
      this.profService.findAll().subscribe(res => {
        this.proffesionalList = res.body as UserAccount[];
        this.proffesionalListFull = res.body as UserAccount[];
        this.userFound = true;
      });
    });
  }
  searchByName(): void {
    console.log('Calling event, yes sir.');
  }
  filterProfessionType(): void {
    this.filteringMode = true;
    if (this.currentProffesionalFilter == -1) {
      this.proffesionalList = this.proffesionalListFull;
    } else {
      var tempList = [];
      for (var i = 0; i < this.proffesionalListFull.length; i++) {
        if (this.proffesionalListFull[i].professionalProfileUser?.profesionalType == this.currentProffesionalFilter) {
          tempList.push(this.proffesionalListFull[i]);
        }
      }
      console.log('Filtered list');
      console.log(tempList);
      this.proffesionalList = tempList;
    }
  }
}
