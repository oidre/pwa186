import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Config } from '../base/config'
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  get() {
    return this.http.get<Category[]>(Config.Url + 'categories')
      .pipe(catchError(this.errorHandler));
  }

  find(word: string) {
    return this.http.get(Config.Url + 'categories/?q=' + word)
      .pipe(catchError(this.errorHandler));
  }

  async getById(id: number): Promise<any>{
    return this.http.get<Category[]>(Config.Url + 'categories/' + id)
      .pipe(catchError(this.errorHandler))
      .toPromise();
  }

  create(category: Category) {
    return this.http.post(Config.Url + 'categories', category)
      .pipe(catchError(this.errorHandler));
  }

  update(category: Category) {
    return this.http.put(Config.Url + 'categories/' + category.id, category)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: Number) {
    return this.http.delete(Config.Url + 'categories/' + id)
      .pipe(catchError(this.errorHandler));
  }

}
