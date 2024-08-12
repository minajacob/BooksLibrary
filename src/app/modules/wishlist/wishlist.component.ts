import { Component, OnInit, signal } from '@angular/core';
import { BooksLibraryService } from '../../services/books-library.service';
import { Constants } from '../../+model/constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ MatProgressSpinnerModule, BookDetailsComponent ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  $wishlist: App.Storage.IWishlist[] = [];

  booksList: App.Library.IBook[] = [];

  $loading = signal<boolean>(true);

  constructor(private librarySvc: BooksLibraryService) { }

  ngOnInit(): void {
    this.getWishlist();
    this.getBooksDetails();
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
