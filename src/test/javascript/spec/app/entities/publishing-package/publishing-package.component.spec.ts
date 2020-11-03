import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { PublishingPackageComponent } from 'app/entities/publishing-package/publishing-package.component';
import { PublishingPackageService } from 'app/entities/publishing-package/publishing-package.service';
import { PublishingPackage } from 'app/shared/model/publishing-package.model';

describe('Component Tests', () => {
  describe('PublishingPackage Management Component', () => {
    let comp: PublishingPackageComponent;
    let fixture: ComponentFixture<PublishingPackageComponent>;
    let service: PublishingPackageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PublishingPackageComponent],
      })
        .overrideTemplate(PublishingPackageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PublishingPackageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PublishingPackageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PublishingPackage(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.publishingPackages && comp.publishingPackages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
