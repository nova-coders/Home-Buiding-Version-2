import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { ScoreUpdateComponent } from 'app/entities/score/score-update.component';
import { ScoreService } from 'app/entities/score/score.service';
import { Score } from 'app/shared/model/score.model';

describe('Component Tests', () => {
  describe('Score Management Update Component', () => {
    let comp: ScoreUpdateComponent;
    let fixture: ComponentFixture<ScoreUpdateComponent>;
    let service: ScoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ScoreUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ScoreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScoreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScoreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Score(123);
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
        const entity = new Score();
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
