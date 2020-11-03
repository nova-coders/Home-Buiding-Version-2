import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { ProfessionalProfileUserDetailComponent } from 'app/entities/professional-profile-user/professional-profile-user-detail.component';
import { ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';

describe('Component Tests', () => {
  describe('ProfessionalProfileUser Management Detail Component', () => {
    let comp: ProfessionalProfileUserDetailComponent;
    let fixture: ComponentFixture<ProfessionalProfileUserDetailComponent>;
    const route = ({ data: of({ professionalProfileUser: new ProfessionalProfileUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ProfessionalProfileUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfessionalProfileUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfessionalProfileUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load professionalProfileUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.professionalProfileUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
