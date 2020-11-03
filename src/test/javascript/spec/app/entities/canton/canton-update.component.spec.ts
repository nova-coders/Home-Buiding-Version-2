import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { CantonUpdateComponent } from 'app/entities/canton/canton-update.component';
import { CantonService } from 'app/entities/canton/canton.service';
import { Canton } from 'app/shared/model/canton.model';

describe('Component Tests', () => {
  describe('Canton Management Update Component', () => {
    let comp: CantonUpdateComponent;
    let fixture: ComponentFixture<CantonUpdateComponent>;
    let service: CantonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [CantonUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CantonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantonUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CantonService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Canton(123);
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
        const entity = new Canton();
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
