import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PublishingPackageDetailComponent } from 'app/entities/publishing-package/publishing-package-detail.component';
import { PublishingPackage } from 'app/shared/model/publishing-package.model';

describe('Component Tests', () => {
  describe('PublishingPackage Management Detail Component', () => {
    let comp: PublishingPackageDetailComponent;
    let fixture: ComponentFixture<PublishingPackageDetailComponent>;
    const route = ({ data: of({ publishingPackage: new PublishingPackage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PublishingPackageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PublishingPackageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PublishingPackageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load publishingPackage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.publishingPackage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
