import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';

describe('Service Tests', () => {
  describe('UserAccount Service', () => {
    let injector: TestBed;
    let service: UserAccountService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserAccount;
    let expectedResult: IUserAccount | IUserAccount[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UserAccountService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UserAccount(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            birthdate: currentDate.format(DATE_TIME_FORMAT),
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UserAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            birthdate: currentDate.format(DATE_TIME_FORMAT),
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate,
            creationDate: currentDate,
          },
          returnedFromService
        );

        service.create(new UserAccount()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UserAccount', () => {
        const returnedFromService = Object.assign(
          {
            identification: 'BBBBBB',
            birthdate: currentDate.format(DATE_TIME_FORMAT),
            profilePicture: 'BBBBBB',
            signaturePicture: 'BBBBBB',
            signatureCode: 'BBBBBB',
            state: true,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate,
            creationDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UserAccount', () => {
        const returnedFromService = Object.assign(
          {
            identification: 'BBBBBB',
            birthdate: currentDate.format(DATE_TIME_FORMAT),
            profilePicture: 'BBBBBB',
            signaturePicture: 'BBBBBB',
            signatureCode: 'BBBBBB',
            state: true,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate,
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

      it('should delete a UserAccount', () => {
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
