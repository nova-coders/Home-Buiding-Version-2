import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyUpdateComponent } from 'app/entities/property/property-update.component';
import { PropertyService } from 'app/entities/property/property.service';
import { Property } from 'app/shared/model/property.model';

describe('Component Tests', () => {
  describe('Property Management Update Component', () => {
    let comp: PropertyUpdateComponent;
    let fixture: ComponentFixture<PropertyUpdateComponent>;
    let service: PropertyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PropertyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Property(123);
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
        const entity = new Property();
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
