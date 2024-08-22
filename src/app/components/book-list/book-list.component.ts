import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookListService } from '../../services/book-list.service';
import { BehaviorSubject, filter, of, switchMap } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookComponent } from '../book/book.component';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookDetailsPopupComponent } from '../book-details-popup/book-details-popup.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    BookComponent,
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class BookListComponent implements OnInit {
  private readonly bookListService: BookListService = inject(BookListService);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  books$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  ngOnInit(): void {
    this.bookListService.getBooksList().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((books: Book[]) => this.books$.next(books));
  }

  addBook(): void {
    this.openDialog(null).afterClosed().pipe(
      switchMap((value: Partial<Book>) => this.bookListService.addBook(value)),
      switchMap(() => this.bookListService.getBooksList()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((books: Book[]) => this.books$.next(books));
  }

  editBook(bookId: string): void {
    this.bookListService.getBook(bookId).pipe(
      filter(Boolean),
      switchMap((book: Book) => this.openDialog(book).afterClosed()),
      filter(Boolean),
      switchMap((value: Partial<Book> | string) => {
        if (typeof value === 'string') {
          this.deleteBook(value);
          return of(null);
        }

        return this.bookListService.editBook(value);
      }),
      filter(Boolean),
      switchMap(() => this.bookListService.getBooksList()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((books: Book[]) => this.books$.next(books));
  }

  deleteBook(bookId: string): void {
    this.bookListService.deleteBook(bookId).pipe(
      switchMap(() => this.bookListService.getBooksList()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((books: Book[]) => this.books$.next(books));
  }

  private openDialog(book: Book | null): MatDialogRef<BookDetailsPopupComponent> {
    return this.dialog.open(BookDetailsPopupComponent, {
      data: { book },
      width: '600px',
      height: '400px',
      disableClose: true,
      autoFocus: false,
    })
  }
}
