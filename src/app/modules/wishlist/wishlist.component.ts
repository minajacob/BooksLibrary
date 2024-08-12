import { Component, OnInit, signal } from '@angular/core';
import { BooksLibraryService } from '../../services/books-library.service';
import { Constants } from '../../+model/constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';
import { forkJoin } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ MatProgressSpinnerModule, BookDetailsComponent, MatSnackBarModule ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  $wishlist: App.Storage.IWishlist[] = [];

  booksList: App.Library.IBook[] = [];

  $loading = signal<boolean>(true);

  constructor(private librarySvc: BooksLibraryService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWishlist();
    this.getBooksDetails();
  }

  bookRemoved(book: App.Library.IBook) {
    this.$wishlist = this.$wishlist.filter((w) => w.key !== book.key);
    this.booksList = this.booksList.filter((b) => b.key !== book.key);
    this._snackBar.open('Book removed from wishlist', 'Ok');
  }

  private getWishlist() {
    const wishlist = localStorage.getItem(Constants.WISHLIST_STORAGE_KEY);
    if (wishlist) {
      this.$wishlist = JSON.parse(wishlist) as App.Storage.IWishlist[];
    }
  }

  private getBooksDetails() {
    forkJoin(this.$wishlist.map((w) => this.librarySvc.getBookDetails(w.key))).subscribe((data) => {
      this.$loading.set(false);
      this.booksList = data;
    });
  }

}
