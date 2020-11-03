import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { MoneyTypeUpdateComponent } from 'app/entities/money-type/money-type-update.component';
import { MoneyTypeService } from 'app/entities/money-type/money-type.service';
import { MoneyType } from 'app/shared/model/money-type.model';

describe('Component Tests', () => {
  describe('MoneyType Management Update Component', () => {
    let comp: MoneyTypeUpdateComponent;
    let fixture: ComponentFixture<MoneyTypeUpdateComponent>;
    let service: MoneyTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [MoneyTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MoneyTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoneyTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoneyTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MoneyType(123);
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
        const entity = new MoneyType();
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
