import { Component, inject, model, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthorDetailsDialogModel, IAuthorDetailsDialogData } from './author-details-dialog.model';
import { BooksLibraryService } from '../../services/books-library.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-author-details-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './author-details-dialog.component.html',
  styleUrl: './author-details-dialog.component.scss',
})
export class AuthorDetailsDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AuthorDetailsDialogComponent>);
  readonly data = inject<IAuthorDetailsDialogData>(MAT_DIALOG_DATA);
  readonly dataModel = model(this.data);
  readonly bookSvc = inject(BooksLibraryService);

  model = new AuthorDetailsDialogModel();

  ngOnInit(): void {
    forkJoin([
      this.bookSvc.getAuthorDetailsByName(this.dataModel().name),
      // this.bookSvc.getAuthorDetails(this.dataModel().authorKey)
    ]).subscribe(([search]) => {
      const authorId = this.dataModel().authorKey.replace('/authors/', '');
      const author = search.docs.find((a) => a.key === authorId);
      if (!author) return;
      this.model.cover_id = authorId;
      this.model.name = author.name;
      this.model.birth_date = author.birth_date;
      this.model.top_work = author.top_work;
      this.model.work_count = author.work_count;
      this.model.top_subjects = author.top_subjects.slice(0, 5);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
