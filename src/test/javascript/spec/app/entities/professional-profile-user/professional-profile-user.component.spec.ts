import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { ProfessionalProfileUserComponent } from 'app/entities/professional-profile-user/professional-profile-user.component';
import { ProfessionalProfileUserService } from 'app/entities/professional-profile-user/professional-profile-user.service';
import { ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';

describe('Component Tests', () => {
  describe('ProfessionalProfileUser Management Component', () => {
    let comp: ProfessionalProfileUserComponent;
    let fixture: ComponentFixture<ProfessionalProfileUserComponent>;
    let service: ProfessionalProfileUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ProfessionalProfileUserComponent],
      })
        .overrideTemplate(ProfessionalProfileUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfessionalProfileUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfessionalProfileUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfessionalProfileUser(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.professionalProfileUsers && comp.professionalProfileUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
