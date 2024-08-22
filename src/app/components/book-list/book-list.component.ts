import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookListService } from '../../services/book-list.service';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  bookListService: BookListService = inject(BookListService);
  destroyRef: DestroyRef = inject(DestroyRef);

  books$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  ngOnInit(): void {
    this.bookListService.getBooksList().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((books: Book[]) => this.books$.next(books));
  }
}
