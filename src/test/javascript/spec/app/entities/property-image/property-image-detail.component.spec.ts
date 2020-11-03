import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyImageDetailComponent } from 'app/entities/property-image/property-image-detail.component';
import { PropertyImage } from 'app/shared/model/property-image.model';

describe('Component Tests', () => {
  describe('PropertyImage Management Detail Component', () => {
    let comp: PropertyImageDetailComponent;
    let fixture: ComponentFixture<PropertyImageDetailComponent>;
    const route = ({ data: of({ propertyImage: new PropertyImage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyImageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PropertyImageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertyImageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load propertyImage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.propertyImage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
