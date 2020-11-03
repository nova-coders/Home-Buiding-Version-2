import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { PublishingPackageUpdateComponent } from 'app/entities/publishing-package/publishing-package-update.component';
import { PublishingPackageService } from 'app/entities/publishing-package/publishing-package.service';
import { PublishingPackage } from 'app/shared/model/publishing-package.model';

describe('Component Tests', () => {
  describe('PublishingPackage Management Update Component', () => {
    let comp: PublishingPackageUpdateComponent;
    let fixture: ComponentFixture<PublishingPackageUpdateComponent>;
    let service: PublishingPackageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [PublishingPackageUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PublishingPackageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PublishingPackageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PublishingPackageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PublishingPackage(123);
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
        const entity = new PublishingPackage();
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
