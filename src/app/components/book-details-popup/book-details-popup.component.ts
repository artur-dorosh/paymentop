import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-book-details-popup',
  standalone: true,
  imports: [],
  templateUrl: './book-details-popup.component.html',
  styleUrl: './book-details-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsPopupComponent {

}
