import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { ProvinceComponent } from 'app/entities/province/province.component';
import { ProvinceService } from 'app/entities/province/province.service';
import { Province } from 'app/shared/model/province.model';

describe('Component Tests', () => {
  describe('Province Management Component', () => {
    let comp: ProvinceComponent;
    let fixture: ComponentFixture<ProvinceComponent>;
    let service: ProvinceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ProvinceComponent],
      })
        .overrideTemplate(ProvinceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvinceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvinceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Province(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.provinces && comp.provinces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
