import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { InitialService } from "../services/initial.service";
import { ConfigurationService } from "../services/configuration.service";

import { Observable, throwError } from "rxjs";
import { catchError, retry, toArray } from "rxjs/operators";
import { Match } from "./match";
import { Matches } from './matches';

@Injectable({
  providedIn: "root"
})
export class MatchesService {
  constructor(
    private http: HttpClient,
    private initialService: InitialService,
    private config: ConfigurationService
  ) {}
  serverUrl = this.initialService.getHost();
  endpoint = this.config.apiEndpoints.matchData;
  url = this.serverUrl + this.endpoint;

  getMatches(): Observable<Matches[]> {
    return this.http.get<Matches[]>(this.url).pipe(      
      retry(3),
      catchError(this.handleError)
    )
    
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
