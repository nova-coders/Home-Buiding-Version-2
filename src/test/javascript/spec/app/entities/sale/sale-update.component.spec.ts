import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { SaleUpdateComponent } from 'app/entities/sale/sale-update.component';
import { SaleService } from 'app/entities/sale/sale.service';
import { Sale } from 'app/shared/model/sale.model';

describe('Component Tests', () => {
  describe('Sale Management Update Component', () => {
    let comp: SaleUpdateComponent;
    let fixture: ComponentFixture<SaleUpdateComponent>;
    let service: SaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SaleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SaleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SaleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SaleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sale(123);
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
        const entity = new Sale();
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
