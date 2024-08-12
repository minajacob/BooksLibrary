import { Component, input, OnInit, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthorDetailsDialogComponent } from '../../modules/author-details-dialog/author-details-dialog.component';
import { BooksLibraryService } from '../../services/books-library.service';
import { BookDetailsDialogComponent } from '../../modules/book-details-dialog/book-details-dialog.component';
import { IBookDetailsDialogData } from '../../modules/book-details-dialog/book-details-dialog.model';
import { MatIconModule } from '@angular/material/icon';
import { addRemoveBookToStorage, checkIfAddedToWishlist } from '../../+model/utility';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, MatIconModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
  book = input.required<App.Library.IBook>();
  showRemoveFromWishlist = input<boolean>(false);

  $addedToWishlist = signal<boolean>(false);

  bookRemoved = output<App.Library.IBook>();

  constructor(private dialog: MatDialog, private librarySvc: BooksLibraryService) {
    this.listenToWishlist();
  }

  ngOnInit(): void {
    this.checkIfAddedToWishlist();
  }

  getAuthorDetails(author: App.Library.IBookAuthor) {
    this.dialog.open(AuthorDetailsDialogComponent, {
      data: { authorKey: author.key, name: author.name },
      width: '700px',
    });
  }

  getBookDetails(book: App.Library.IBook) {
    const data: IBookDetailsDialogData = { book };
    this.dialog.open(BookDetailsDialogComponent, {
      data: data,
      width: '700px',
    });
  }

  removeFormWishlist() {
    const added = addRemoveBookToStorage(this.book().key, this.book().title);
    this.$addedToWishlist.set(added);
    this.bookRemoved.emit(this.book());
  }

  private checkIfAddedToWishlist() {
    const added = checkIfAddedToWishlist(this.book().key);
    this.$addedToWishlist.set(added);
  }

  private listenToWishlist() {
    this.librarySvc.$wishlistChanged.pipe(takeUntilDestroyed()).subscribe(() => {
      this.checkIfAddedToWishlist();
    });
  }
}
