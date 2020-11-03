import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { ScoreComponent } from 'app/entities/score/score.component';
import { ScoreService } from 'app/entities/score/score.service';
import { Score } from 'app/shared/model/score.model';

describe('Component Tests', () => {
  describe('Score Management Component', () => {
    let comp: ScoreComponent;
    let fixture: ComponentFixture<ScoreComponent>;
    let service: ScoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ScoreComponent],
      })
        .overrideTemplate(ScoreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScoreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScoreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Score(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.scores && comp.scores[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
