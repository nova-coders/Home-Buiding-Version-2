import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyCategoryComponent } from 'app/entities/property-category/property-category.component';
import { PropertyCategoryService } from 'app/entities/property-category/property-category.service';
import { PropertyCategory } from 'app/shared/model/property-category.model';

describe('Component Tests', () => {
  describe('PropertyCategory Management Component', () => {
    let comp: PropertyCategoryComponent;
    let fixture: ComponentFixture<PropertyCategoryComponent>;
    let service: PropertyCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyCategoryComponent],
      })
        .overrideTemplate(PropertyCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PropertyCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.propertyCategories && comp.propertyCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
