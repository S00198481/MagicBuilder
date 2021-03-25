import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MagicResponse } from '../magic-response';

@Injectable({
  providedIn: 'root'
})
export class MagicApiService {

  private _siteURL = "https://api.magicthegathering.io/v1/cards?name="
  constructor(private _http:HttpClient) { }

  getCards(cardName): Observable<JSON> {
    return this._http.get<JSON>(this._siteURL + cardName)
    .pipe(
      tap(data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }
  private handleError(err:HttpErrorResponse) {
    console.log('MagicApiService: ' + err.message);
    return Observable.throw(err.message);
  }
}
