import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { CantonComponent } from 'app/entities/canton/canton.component';
import { CantonService } from 'app/entities/canton/canton.service';
import { Canton } from 'app/shared/model/canton.model';

describe('Component Tests', () => {
  describe('Canton Management Component', () => {
    let comp: CantonComponent;
    let fixture: ComponentFixture<CantonComponent>;
    let service: CantonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [CantonComponent],
      })
        .overrideTemplate(CantonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CantonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Canton(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cantons && comp.cantons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
