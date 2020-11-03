import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { SupportTicketUpdateComponent } from 'app/entities/support-ticket/support-ticket-update.component';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';
import { SupportTicket } from 'app/shared/model/support-ticket.model';

describe('Component Tests', () => {
  describe('SupportTicket Management Update Component', () => {
    let comp: SupportTicketUpdateComponent;
    let fixture: ComponentFixture<SupportTicketUpdateComponent>;
    let service: SupportTicketService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SupportTicketUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SupportTicketUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupportTicketUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportTicketService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupportTicket(123);
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
        const entity = new SupportTicket();
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
