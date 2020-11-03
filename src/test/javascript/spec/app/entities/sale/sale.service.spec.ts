import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SaleService } from 'app/entities/sale/sale.service';
import { ISale, Sale } from 'app/shared/model/sale.model';

describe('Service Tests', () => {
  describe('Sale Service', () => {
    let injector: TestBed;
    let service: SaleService;
    let httpMock: HttpTestingController;
    let elemDefault: ISale;
    let expectedResult: ISale | ISale[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SaleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Sale(0, currentDate, 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            finalDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Sale', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            finalDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            finalDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Sale()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Sale', () => {
        const returnedFromService = Object.assign(
          {
            finalDate: currentDate.format(DATE_TIME_FORMAT),
            cadastralPlan: 'BBBBBB',
            registryStudy: 'BBBBBB',
            propertyId: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            finalDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Sale', () => {
        const returnedFromService = Object.assign(
          {
            finalDate: currentDate.format(DATE_TIME_FORMAT),
            cadastralPlan: 'BBBBBB',
            registryStudy: 'BBBBBB',
            propertyId: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            finalDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Sale', () => {
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
