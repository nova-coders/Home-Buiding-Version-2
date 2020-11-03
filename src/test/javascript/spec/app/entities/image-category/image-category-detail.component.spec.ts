import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { ImageCategoryDetailComponent } from 'app/entities/image-category/image-category-detail.component';
import { ImageCategory } from 'app/shared/model/image-category.model';

describe('Component Tests', () => {
  describe('ImageCategory Management Detail Component', () => {
    let comp: ImageCategoryDetailComponent;
    let fixture: ComponentFixture<ImageCategoryDetailComponent>;
    const route = ({ data: of({ imageCategory: new ImageCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [ImageCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ImageCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load imageCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.imageCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
