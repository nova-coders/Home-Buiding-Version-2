import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyCategoryUpdateComponent } from 'app/entities/property-category/property-category-update.component';
import { PropertyCategoryService } from 'app/entities/property-category/property-category.service';
import { PropertyCategory } from 'app/shared/model/property-category.model';

describe('Component Tests', () => {
  describe('PropertyCategory Management Update Component', () => {
    let comp: PropertyCategoryUpdateComponent;
    let fixture: ComponentFixture<PropertyCategoryUpdateComponent>;
    let service: PropertyCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PropertyCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PropertyCategory(123);
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
        const entity = new PropertyCategory();
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
