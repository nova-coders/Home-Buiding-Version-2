import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';

@Component({
  selector: 'jhi-view-professional',
  templateUrl: './view-professional.component.html',
  styleUrls: ['./view-professional.component.scss'],
})
export class ViewProfessionalComponent implements OnInit {
  public userAccount: UserAccount;
  public userFound: boolean = false;
  private userAccountId: number;
  constructor(private router: Router, private route: ActivatedRoute, public userService: UserAccountService) {
    this.userAccount = new UserAccount();
    this.userAccountId = -1;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      this.userAccountId = params['id'];
      this.userService.findWithProfessionalProfile(this.userAccountId).subscribe(res => {
        this.userAccount = res.body as UserAccount;
        this.userFound = true;
      });
    });
  }
}
