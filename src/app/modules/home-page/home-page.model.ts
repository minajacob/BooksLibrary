import { signal } from "@angular/core";

export class HomePageModel {
    books: App.Library.IBook[] = [];
    $loading = signal<boolean>(true);
}
