import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Workorder } from '../Models/workorder';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {
  private workordersUrl = 'api/workorders';

  constructor(private http: HttpClient) { }

  getWorkorders(): Observable<Workorder[]> {
    return this.http.get<Workorder[]>(this.workordersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWorkorder(id: number): Observable<Workorder> {
    if (id === 0) {
      return of(this.initializeWorkorder());
    }
    const url = `${this.workordersUrl}/${id}`;
    return this.http.get<Workorder>(url)
      .pipe(
        tap(data => console.log('getWorkorder: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createWorkorder(workorder: Workorder): Observable<Workorder> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    workorder.id = null;
    return this.http.post<Workorder>(this.workordersUrl, workorder, { headers })
      .pipe(
        tap(data => console.log('createWorkorder: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteWorkorder(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.workordersUrl}/${id}`;
    return this.http.delete<Workorder>(url, { headers })
      .pipe(
        tap(data => console.log('deleteWorkorder: ' + id)),
        catchError(this.handleError)
      );
  }

  updateWorkorder(workorder: Workorder): Observable<Workorder> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.workordersUrl}/${workorder.id}`;
    return this.http.put<Workorder>(url, workorder, { headers })
      .pipe(
        tap(() => console.log('updateWorkorder: ' + workorder.id)),
        // Return the workorder on an update
        map(() => workorder),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeWorkorder(): Workorder {
    // Return an initialized object
    return {
      id: 0,
      workorderName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }
}
