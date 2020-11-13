import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NotificationService } from 'app/entities/notification/notification.service';
import { INotification, Notification } from 'app/shared/model/notification.model';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

describe('Service Tests', () => {
  describe('Notification Service', () => {
    let injector: TestBed;
    let service: NotificationService;
    let httpMock: HttpTestingController;
    let elemDefault: INotification;
    let expectedResult: INotification | INotification[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NotificationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Notification(0, 'AAAAAAA', 'AAAAAAA', false, NotificationType.Subasta, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Notification', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Notification()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Notification', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            message: 'BBBBBB',
            state: true,
            type: 'BBBBBB',
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Notification', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            message: 'BBBBBB',
            state: true,
            type: 'BBBBBB',
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Notification', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
