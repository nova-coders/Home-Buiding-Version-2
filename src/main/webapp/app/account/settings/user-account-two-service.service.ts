import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../../app.constants";
import {UserAccount} from "../../shared/model/user-account.model";

@Injectable({
  providedIn: 'root'
})
export class UserAccountTwoServiceService {

  public resourceUrl = SERVER_API_URL + 'api/';

  constructor(private httpClient: HttpClient) { }

  public updateUserAccount(userAccount: UserAccount): Observable<any>{
    return this.httpClient.put(this.resourceUrl + "UserAccountToUpdate", userAccount);
  }

}
