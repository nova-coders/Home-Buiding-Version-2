import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { SupportTicketLogUpdateComponent } from 'app/entities/support-ticket-log/support-ticket-log-update.component';
import { SupportTicketLogService } from 'app/entities/support-ticket-log/support-ticket-log.service';
import { SupportTicketLog } from 'app/shared/model/support-ticket-log.model';

describe('Component Tests', () => {
  describe('SupportTicketLog Management Update Component', () => {
    let comp: SupportTicketLogUpdateComponent;
    let fixture: ComponentFixture<SupportTicketLogUpdateComponent>;
    let service: SupportTicketLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SupportTicketLogUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SupportTicketLogUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupportTicketLogUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportTicketLogService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupportTicketLog(123);
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
        const entity = new SupportTicketLog();
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
