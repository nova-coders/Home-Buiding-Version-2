import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PropertyCategoryDetailComponent } from 'app/entities/property-category/property-category-detail.component';
import { PropertyCategory } from 'app/shared/model/property-category.model';

describe('Component Tests', () => {
  describe('PropertyCategory Management Detail Component', () => {
    let comp: PropertyCategoryDetailComponent;
    let fixture: ComponentFixture<PropertyCategoryDetailComponent>;
    const route = ({ data: of({ propertyCategory: new PropertyCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PropertyCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PropertyCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertyCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load propertyCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.propertyCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
