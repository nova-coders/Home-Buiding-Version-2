import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { ProfessionalProfileUserUpdateComponent } from 'app/entities/professional-profile-user/professional-profile-user-update.component';
import { ProfessionalProfileUserService } from 'app/entities/professional-profile-user/professional-profile-user.service';
import { ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';

describe('Component Tests', () => {
  describe('ProfessionalProfileUser Management Update Component', () => {
    let comp: ProfessionalProfileUserUpdateComponent;
    let fixture: ComponentFixture<ProfessionalProfileUserUpdateComponent>;
    let service: ProfessionalProfileUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ProfessionalProfileUserUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfessionalProfileUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfessionalProfileUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfessionalProfileUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfessionalProfileUser(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfessionalProfileUser();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
