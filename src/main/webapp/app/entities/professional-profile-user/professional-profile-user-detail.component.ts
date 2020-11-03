import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';

@Component({
  selector: 'jhi-professional-profile-user-detail',
  templateUrl: './professional-profile-user-detail.component.html',
})
export class ProfessionalProfileUserDetailComponent implements OnInit {
  professionalProfileUser: IProfessionalProfileUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professionalProfileUser }) => (this.professionalProfileUser = professionalProfileUser));
  }

  previousState(): void {
    window.history.back();
  }
}
