import { Component, OnInit } from '@angular/core';
import { BooksLibraryService } from '../../services/books-library.service';
import { HomePageModel } from './home-page.model';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, BookDetailsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  model = new HomePageModel();

  constructor(private books: BooksLibraryService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.books.getBooks('finance').subscribe((data) => {
      this.model.books = data.works;
      this.model.$loading.set(false);
    });
  }

}
