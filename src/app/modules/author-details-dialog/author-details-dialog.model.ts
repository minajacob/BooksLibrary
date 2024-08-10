import { signal } from "@angular/core";

export interface IAuthorDetailsDialogData {
    authorKey: string;
    name: string;
}

export class AuthorDetailsDialogModel {
    name = '';
    cover_id = '';
    birth_date = '';
    top_work = '';
    work_count = 0;
    top_subjects: string[] = [];
    books: App.Library.IBook[] = [];
    $loading = signal<boolean>(true);
}