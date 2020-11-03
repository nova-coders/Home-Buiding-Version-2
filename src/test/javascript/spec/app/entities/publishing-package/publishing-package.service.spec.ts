import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PublishingPackageService } from 'app/entities/publishing-package/publishing-package.service';
import { IPublishingPackage, PublishingPackage } from 'app/shared/model/publishing-package.model';

describe('Service Tests', () => {
  describe('PublishingPackage Service', () => {
    let injector: TestBed;
    let service: PublishingPackageService;
    let httpMock: HttpTestingController;
    let elemDefault: IPublishingPackage;
    let expectedResult: IPublishingPackage | IPublishingPackage[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PublishingPackageService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PublishingPackage(0, 'AAAAAAA', 0, 0, 0, 0, false, currentDate, 0, false);
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

      it('should create a PublishingPackage', () => {
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

        service.create(new PublishingPackage()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PublishingPackage', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            price: 1,
            cantPropertySale: 1,
            cantPropertyRent: 1,
            cantDays: 1,
            professional: true,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            type: 1,
            state: true,
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

      it('should return a list of PublishingPackage', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            price: 1,
            cantPropertySale: 1,
            cantPropertyRent: 1,
            cantDays: 1,
            professional: true,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            type: 1,
            state: true,
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

      it('should delete a PublishingPackage', () => {
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
