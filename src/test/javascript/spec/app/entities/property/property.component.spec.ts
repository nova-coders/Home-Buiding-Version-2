import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyComponent } from 'app/entities/property/property.component';
import { PropertyService } from 'app/entities/property/property.service';
import { Property } from 'app/shared/model/property.model';

describe('Component Tests', () => {
  describe('Property Management Component', () => {
    let comp: PropertyComponent;
    let fixture: ComponentFixture<PropertyComponent>;
    let service: PropertyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyComponent],
      })
        .overrideTemplate(PropertyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Property(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.properties && comp.properties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
