import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'showImage',
  standalone: true
})
export class ShowImagePipe implements PipeTransform {
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  transform(value: string | undefined): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value || '');
  }

}
