import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  @Input() book: Book;

  @Output() editBookEvent: EventEmitter<string> = new EventEmitter();
  @Output() deleteBookEvent: EventEmitter<string> = new EventEmitter();

  editBook(bookId: string): void {
    this.editBookEvent.emit(bookId);
  }

  deleteBook(bookId: string): void {
    this.deleteBookEvent.emit(bookId);
  }
}
