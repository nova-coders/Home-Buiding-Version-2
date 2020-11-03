import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { ImageCategoryUpdateComponent } from 'app/entities/image-category/image-category-update.component';
import { ImageCategoryService } from 'app/entities/image-category/image-category.service';
import { ImageCategory } from 'app/shared/model/image-category.model';

describe('Component Tests', () => {
  describe('ImageCategory Management Update Component', () => {
    let comp: ImageCategoryUpdateComponent;
    let fixture: ComponentFixture<ImageCategoryUpdateComponent>;
    let service: ImageCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ImageCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ImageCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImageCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ImageCategory(123);
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
        const entity = new ImageCategory();
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
