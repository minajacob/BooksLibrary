import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BooksLibraryService } from '../../services/books-library.service';
import { HomePageModel } from './home-page.model';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatProgressSpinnerModule],
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
    this.books.getBooks().subscribe((data) => {
      this.model.books = data.works;
      this.model.$loading.set(false);
    });
  }

}
