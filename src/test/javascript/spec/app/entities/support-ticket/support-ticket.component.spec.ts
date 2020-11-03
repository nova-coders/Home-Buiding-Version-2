import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { SupportTicketComponent } from 'app/entities/support-ticket/support-ticket.component';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';
import { SupportTicket } from 'app/shared/model/support-ticket.model';

describe('Component Tests', () => {
  describe('SupportTicket Management Component', () => {
    let comp: SupportTicketComponent;
    let fixture: ComponentFixture<SupportTicketComponent>;
    let service: SupportTicketService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SupportTicketComponent],
      })
        .overrideTemplate(SupportTicketComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupportTicketComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportTicketService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SupportTicket(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supportTickets && comp.supportTickets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
