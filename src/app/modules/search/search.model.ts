import { signal } from '@angular/core';
import { Subject } from 'rxjs';

export enum FilterBy {
  Title = 'title',
  Author = 'author',
  Subject = 'subject',
}

export class SearchModel {
  $loading = signal(false);
  filterBy: FilterBy = FilterBy.Title;
  filterTxt: string = '';
  readonly filterByList = FilterBy;

  searchInput = new Subject<string>();

  booksList: App.Library.IBook[] = [];
}
