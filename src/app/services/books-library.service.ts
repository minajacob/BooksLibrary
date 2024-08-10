import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksLibraryService {

  apiURL = 'https://openlibrary.org';

  constructor(private $http: HttpClient) {

  }

  getBooks(subject: string) {
    return this.$http.get<App.Library.IBookSubject>(`${this.apiURL}/subjects/${subject}.json`);
  }

  getAuthorDetails(authorKey: string) {
    const url = `${this.apiURL}${authorKey}.json`;
    return this.$http.get<App.Library.IAuthor>(url);
  }

  getAuthorDetailsByName(name: string) {
    const url = `${this.apiURL}/search/authors.json?q=${name}`;
    return this.$http.get<App.Library.ISearchAuthor>(url);
  }

}
