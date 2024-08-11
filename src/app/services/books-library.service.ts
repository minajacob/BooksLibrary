import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksLibraryService {

  $wishlistChanged = new Subject<void>();

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

  getBookDetails(bookKey: string) {
    const url = `${this.apiURL}${bookKey}.json`;
    return this.$http.get<App.Library.IBook>(url);
  }

  getBookDetailsByTitle(title: string) {
    const url = `${this.apiURL}/search.json?q=${title}&fields=key,title,author_name,first_publish_year,cover_i,edition_count,number_of_pages_median,author_key`;
    return this.$http.get<App.Library.ISearchBook>(url);
  }

}
