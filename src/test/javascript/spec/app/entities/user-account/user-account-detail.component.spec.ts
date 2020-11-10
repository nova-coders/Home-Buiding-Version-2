import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { HomeBuildingTestModule } from '../../../test.module';
import { UserAccountDetailComponent } from 'app/entities/user-account/user-account-detail.component';
import { UserAccount } from 'app/shared/model/user-account.model';

describe('Component Tests', () => {
  describe('UserAccount Management Detail Component', () => {
    let comp: UserAccountDetailComponent;
    let fixture: ComponentFixture<UserAccountDetailComponent>;
    let dataUtils: JhiDataUtils;
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
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load userAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
