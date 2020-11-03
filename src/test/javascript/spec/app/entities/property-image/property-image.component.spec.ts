import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyImageComponent } from 'app/entities/property-image/property-image.component';
import { PropertyImageService } from 'app/entities/property-image/property-image.service';
import { PropertyImage } from 'app/shared/model/property-image.model';

describe('Component Tests', () => {
  describe('PropertyImage Management Component', () => {
    let comp: PropertyImageComponent;
    let fixture: ComponentFixture<PropertyImageComponent>;
    let service: PropertyImageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyImageComponent],
      })
        .overrideTemplate(PropertyImageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyImageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyImageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PropertyImage(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.propertyImages && comp.propertyImages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
