import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyImageUpdateComponent } from 'app/entities/property-image/property-image-update.component';
import { PropertyImageService } from 'app/entities/property-image/property-image.service';
import { PropertyImage } from 'app/shared/model/property-image.model';

describe('Component Tests', () => {
  describe('PropertyImage Management Update Component', () => {
    let comp: PropertyImageUpdateComponent;
    let fixture: ComponentFixture<PropertyImageUpdateComponent>;
    let service: PropertyImageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyImageUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PropertyImageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyImageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyImageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PropertyImage(123);
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
        const entity = new PropertyImage();
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
