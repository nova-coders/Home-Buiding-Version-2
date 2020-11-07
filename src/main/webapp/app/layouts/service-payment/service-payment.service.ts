import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPublishingPackage } from 'app/shared/model/publishing-package.model';

type EntityResponseType = HttpResponse<IPublishingPackage>;
type EntityArrayResponseType = HttpResponse<IPublishingPackage[]>;
@Injectable({
  providedIn: 'root',
})
export class ServicePaymentService {
  public resourceUrl = SERVER_API_URL + 'api/publishing-packages';
  constructor(protected http: HttpClient) {}
}
