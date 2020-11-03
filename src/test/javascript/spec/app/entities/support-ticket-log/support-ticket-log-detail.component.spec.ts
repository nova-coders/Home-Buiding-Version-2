import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeBuildingTestModule } from '../../../test.module';
import { SupportTicketLogDetailComponent } from 'app/entities/support-ticket-log/support-ticket-log-detail.component';
import { SupportTicketLog } from 'app/shared/model/support-ticket-log.model';

describe('Component Tests', () => {
  describe('SupportTicketLog Management Detail Component', () => {
    let comp: SupportTicketLogDetailComponent;
    let fixture: ComponentFixture<SupportTicketLogDetailComponent>;
    const route = ({ data: of({ supportTicketLog: new SupportTicketLog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HomeBuildingTestModule],
        declarations: [SupportTicketLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SupportTicketLogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupportTicketLogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supportTicketLog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supportTicketLog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
