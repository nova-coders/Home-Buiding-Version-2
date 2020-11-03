import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { MoneyTypeComponent } from 'app/entities/money-type/money-type.component';
import { MoneyTypeService } from 'app/entities/money-type/money-type.service';
import { MoneyType } from 'app/shared/model/money-type.model';

describe('Component Tests', () => {
  describe('MoneyType Management Component', () => {
    let comp: MoneyTypeComponent;
    let fixture: ComponentFixture<MoneyTypeComponent>;
    let service: MoneyTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [MoneyTypeComponent],
      })
        .overrideTemplate(MoneyTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoneyTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoneyTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MoneyType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.moneyTypes && comp.moneyTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
