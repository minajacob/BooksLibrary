import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BookDetailsDialogModel, IBookDetailsDialogData } from './book-details-dialog.model';
import { BooksLibraryService } from '../../services/books-library.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Constants } from '../../+model/constants';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { addRemoveBookToStorage, checkIfAddedToWishlist } from '../../+model/utility';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule, MatIconModule, MatSnackBarModule],
  templateUrl: './book-details-dialog.component.html',
  styleUrl: './book-details-dialog.component.scss'
})
export class BookDetailsDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<BookDetailsDialogComponent>);
  readonly data = inject<IBookDetailsDialogData>(MAT_DIALOG_DATA);
  readonly dataModel = model(this.data);
  readonly librarySvc = inject(BooksLibraryService);
  private readonly _snackBar = inject(MatSnackBar);

  model = new BookDetailsDialogModel();

  ngOnInit(): void {
    this.getBookDetails(this.dataModel().book);
    this.checkIfAddedToWishlist();
  }

  getBookDetails(book: App.Library.IBook) {

    this.librarySvc.getBookDetailsByTitle(book.title).subscribe((data) => {
      const bookObj = data.docs.find((b) => b.key === book.key);
      this.model.$loading.set(false);
      if (bookObj) {
        this.model.book = bookObj;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addRemoveWishList() {
    const added = addRemoveBookToStorage(this.model.book.key, this.model.book.title);
    this.model.$addedToWishlist.set(added);
    this.librarySvc.$wishlistChanged.next();
    if (added) {
      this._snackBar.open('Book added to wishlist', 'Ok');
    } else {
      this._snackBar.open('Book removed from wishlist', 'Ok');
    }
  }


  private checkIfAddedToWishlist() {
    const added = checkIfAddedToWishlist(this.dataModel().book.key);
    this.model.$addedToWishlist.set(added);
  }

}
