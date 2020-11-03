import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeBuildingTestModule } from '../../../test.module';
import { SupportTicketLogComponent } from 'app/entities/support-ticket-log/support-ticket-log.component';
import { SupportTicketLogService } from 'app/entities/support-ticket-log/support-ticket-log.service';
import { SupportTicketLog } from 'app/shared/model/support-ticket-log.model';

describe('Component Tests', () => {
  describe('SupportTicketLog Management Component', () => {
    let comp: SupportTicketLogComponent;
    let fixture: ComponentFixture<SupportTicketLogComponent>;
    let service: SupportTicketLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SupportTicketLogComponent],
      })
        .overrideTemplate(SupportTicketLogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupportTicketLogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportTicketLogService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SupportTicketLog(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supportTicketLogs && comp.supportTicketLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
