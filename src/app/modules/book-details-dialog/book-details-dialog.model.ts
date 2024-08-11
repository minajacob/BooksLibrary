import { signal } from "@angular/core";

export interface IBookDetailsDialogData {
    book: App.Library.IBook;
}

export class BookDetailsDialogModel {
    book: App.Library.IBookDoc = {} as App.Library.IBookDoc;
    $loading = signal<boolean>(true);
    $addedToWishlist = signal<boolean>(false);
}