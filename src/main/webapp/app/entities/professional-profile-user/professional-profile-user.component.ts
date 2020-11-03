import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { ProfessionalProfileUserService } from './professional-profile-user.service';
import { ProfessionalProfileUserDeleteDialogComponent } from './professional-profile-user-delete-dialog.component';

@Component({
  selector: 'jhi-professional-profile-user',
  templateUrl: './professional-profile-user.component.html',
})
export class ProfessionalProfileUserComponent implements OnInit, OnDestroy {
  professionalProfileUsers?: IProfessionalProfileUser[];
  eventSubscriber?: Subscription;

  constructor(
    protected professionalProfileUserService: ProfessionalProfileUserService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.professionalProfileUserService
      .query()
      .subscribe((res: HttpResponse<IProfessionalProfileUser[]>) => (this.professionalProfileUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfessionalProfileUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfessionalProfileUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfessionalProfileUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('professionalProfileUserListModification', () => this.loadAll());
  }

  delete(professionalProfileUser: IProfessionalProfileUser): void {
    const modalRef = this.modalService.open(ProfessionalProfileUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.professionalProfileUser = professionalProfileUser;
  }
}
