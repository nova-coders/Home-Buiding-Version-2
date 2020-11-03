import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { SaleComponent } from 'app/entities/sale/sale.component';
import { SaleService } from 'app/entities/sale/sale.service';
import { Sale } from 'app/shared/model/sale.model';

describe('Component Tests', () => {
  describe('Sale Management Component', () => {
    let comp: SaleComponent;
    let fixture: ComponentFixture<SaleComponent>;
    let service: SaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SaleComponent],
      })
        .overrideTemplate(SaleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SaleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SaleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Sale(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sales && comp.sales[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
