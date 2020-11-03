import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { RentComponent } from 'app/entities/rent/rent.component';
import { RentService } from 'app/entities/rent/rent.service';
import { Rent } from 'app/shared/model/rent.model';

describe('Component Tests', () => {
  describe('Rent Management Component', () => {
    let comp: RentComponent;
    let fixture: ComponentFixture<RentComponent>;
    let service: RentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [RentComponent],
      })
        .overrideTemplate(RentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Rent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rents && comp.rents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
