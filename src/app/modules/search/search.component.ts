import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FilterBy, SearchModel } from './search.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { BooksLibraryService } from '../../services/books-library.service';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, BookDetailsComponent, MatProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  model = new SearchModel();

  constructor(private librarySvc: BooksLibraryService) { }

  ngOnInit(): void {
    this.subscribeToSearchInput();
  }

  search() {
    this.model.searchInput.next(this.model.filterTxt);
  }

  private subscribeToSearchInput() {
    this.model.searchInput
    .pipe(debounceTime(400))
    .pipe(distinctUntilChanged())
    .pipe(switchMap((txt: string) => {
      this.model.$loading.set(true);
      return this.librarySvc.getBookDetailsByTitle(txt);
    })).subscribe((res) => {
      this.model.$loading.set(false);
      const books = this.getBooks(res.docs);
      this.model.booksList = books.slice(0, 9).map((book) => {
        return {
          title: book.title,
          authors: book.author_name.map((a,i) => ({ name: a, key: book.author_key[i] })),
          first_publish_year: book.first_publish_year,
          key: book.key,
          cover_id: book.cover_i,
          subject: book.title,
          edition_count: book.edition_count,
        };
      });
    });
  }

  private getBooks(docs: App.Library.IBookDoc[]) {
    switch (this.model.filterBy) {
      case FilterBy.Title:
        return docs;
      case FilterBy.Author:
        return docs.filter((doc) => doc.author_name.includes(this.model.filterTxt));
      case FilterBy.Subject:
        return docs.filter((doc) => doc.title.includes(this.model.filterTxt));
      default:
        return docs;
    }
  }

}
