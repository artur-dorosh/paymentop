import { FormControl } from '@angular/forms';

export interface BookForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  author: FormControl<string | null>;
  publicationYear: FormControl<number | null>;
  isTopSeller: FormControl<boolean | null>;
  cover: FormControl<string | null>;
}
