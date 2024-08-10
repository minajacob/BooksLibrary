import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BooksLibraryService } from '../../services/books-library.service';
import { HomePageModel } from './home-page.model';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthorDetailsDialogComponent } from '../author-details-dialog/author-details-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatProgressSpinnerModule, MatDialogModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  model = new HomePageModel();

  constructor(private books: BooksLibraryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.books.getBooks('love').subscribe((data) => {
      this.model.books = data.works;
      this.model.$loading.set(false);
    });
  }

  getAuthorDetails(author: App.Library.IBookAuthor) {
    this.dialog.open(AuthorDetailsDialogComponent, {
      data: { authorKey: author.key, name: author.name },
      width: '700px',
    });
  }

}
