import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksLibraryService {

  apiURL = 'https://openlibrary.org/';

  constructor(private $http: HttpClient) {

  }

  getBooks() {
    return this.$http.get<App.Library.IBookSubject>(`${this.apiURL}subjects/love.json`);
  }

}
