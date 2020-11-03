import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { UserAccountDetailComponent } from 'app/entities/user-account/user-account-detail.component';
import { UserAccount } from 'app/shared/model/user-account.model';

describe('Component Tests', () => {
  describe('UserAccount Management Detail Component', () => {
    let comp: UserAccountDetailComponent;
    let fixture: ComponentFixture<UserAccountDetailComponent>;
    const route = ({ data: of({ userAccount: new UserAccount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [UserAccountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
