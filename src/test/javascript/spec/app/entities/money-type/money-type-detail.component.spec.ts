import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { MoneyTypeDetailComponent } from 'app/entities/money-type/money-type-detail.component';
import { MoneyType } from 'app/shared/model/money-type.model';

describe('Component Tests', () => {
  describe('MoneyType Management Detail Component', () => {
    let comp: MoneyTypeDetailComponent;
    let fixture: ComponentFixture<MoneyTypeDetailComponent>;
    const route = ({ data: of({ moneyType: new MoneyType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [MoneyTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MoneyTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MoneyTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load moneyType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.moneyType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
