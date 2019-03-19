import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Config } from '../base/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(){
    return this.http.get(Config.Url + 'products')
      .pipe(catchError(this.errorHandler));
  }
}
