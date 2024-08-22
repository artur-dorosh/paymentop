import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../interfaces/book.interface';
import { BookForm } from '../../interfaces/book-form.interface';
import { MatIcon } from '@angular/material/icon';

interface DialogData {
  book: Book | null;
}

@Component({
  selector: 'app-book-details-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './book-details-popup.component.html',
  styleUrl: './book-details-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsPopupComponent implements OnInit {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

  private readonly dialogRef: MatDialogRef<BookDetailsPopupComponent> = inject(MatDialogRef<BookDetailsPopupComponent>);
  private readonly fb: FormBuilder = inject(FormBuilder);

  bookForm: FormGroup<BookForm>;

  ngOnInit(): void {
    this.buildForm();

    if (this.data.book) {
      this.fillForm(this.data.book);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteBook(): void {
    this.dialogRef.close(this.data.book?.id);
  }

  saveBook(): void {
    this.dialogRef.close({
      ...this.data.book,
      ...this.bookForm.value
    });
  }

  private buildForm(): void {
    this.bookForm = this.fb.group<BookForm>({
      title: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null),
      author: this.fb.control(null, [Validators.required]),
      publicationYear: this.fb.control(null, [Validators.required]),
      isTopSeller: this.fb.control(false, [Validators.required]),
    });
  }

  private fillForm(book: Book): void {
    this.bookForm.patchValue(book);
  }
}
