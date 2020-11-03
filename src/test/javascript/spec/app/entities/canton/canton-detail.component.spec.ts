import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { CantonDetailComponent } from 'app/entities/canton/canton-detail.component';
import { Canton } from 'app/shared/model/canton.model';

describe('Component Tests', () => {
  describe('Canton Management Detail Component', () => {
    let comp: CantonDetailComponent;
    let fixture: ComponentFixture<CantonDetailComponent>;
    const route = ({ data: of({ canton: new Canton(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [CantonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CantonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CantonDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load canton on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.canton).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
