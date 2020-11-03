import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { ProfessionalProfileUserService } from './professional-profile-user.service';

@Component({
  templateUrl: './professional-profile-user-delete-dialog.component.html',
})
export class ProfessionalProfileUserDeleteDialogComponent {
  professionalProfileUser?: IProfessionalProfileUser;

  constructor(
    protected professionalProfileUserService: ProfessionalProfileUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.professionalProfileUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('professionalProfileUserListModification');
      this.activeModal.close();
    });
  }
}
