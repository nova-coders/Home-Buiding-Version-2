import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { ImageCategoryComponent } from 'app/entities/image-category/image-category.component';
import { ImageCategoryService } from 'app/entities/image-category/image-category.service';
import { ImageCategory } from 'app/shared/model/image-category.model';

describe('Component Tests', () => {
  describe('ImageCategory Management Component', () => {
    let comp: ImageCategoryComponent;
    let fixture: ComponentFixture<ImageCategoryComponent>;
    let service: ImageCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ImageCategoryComponent],
      })
        .overrideTemplate(ImageCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImageCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ImageCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.imageCategories && comp.imageCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
