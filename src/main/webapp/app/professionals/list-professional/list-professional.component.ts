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
  public currentUserFind: string = '';
  public initPage: number = 1;
  public currentProffesionalFilter: number = -1;
  public currentFilterSelect: boolean = false;
  public currentFilterSearch: boolean = false;
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
    this.filteringMode = true;
    this.currentFilterSearch = true;
    if (this.currentUserFind == '' || this.currentUserFind.length == 0) {
      this.currentFilterSearch = false;
      this.proffesionalList = this.proffesionalListFull;
    } else {
      this.currentProffesionalFilter = -1;
      var tempList = [];
      var currentData = this.proffesionalListFull;
      /*if (this.currentFilterSelect) {
        currentData = this.proffesionalList;
      }*/
      for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].professionalProfileUser?.description?.toLocaleLowerCase().includes(this.currentUserFind.toLocaleLowerCase())) {
          tempList.push(currentData[i]);
        }
      }
      console.log('Filtered list');
      console.log(tempList);
      this.proffesionalList = tempList;
    }
  }
  filterProfessionType(): void {
    this.filteringMode = true;
    this.currentFilterSelect = true;
    if (this.currentProffesionalFilter == -1) {
      this.currentFilterSelect = false;
      this.proffesionalList = this.proffesionalListFull;
    } else {
      this.currentUserFind = '';
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
