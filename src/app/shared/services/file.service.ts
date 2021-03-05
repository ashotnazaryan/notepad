import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private translate: TranslateService) {}

  download = (
    data: string,
    type = 'text/plain',
    fileName = 'text.txt'
  ): void => {
    const textToBLOB = new Blob([data], { type });
    const newLink = document.createElement('a');

    newLink.download = fileName;

    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = 'none';
      document.body.appendChild(newLink);
    }

    newLink.click();
  };

  upload = (file: File): Observable<string | null | ProgressEvent> => {
    const fileReader = new FileReader();

    return new Observable((subscriber) => {
      if (file.type !== 'text/plain') {
        subscriber.error(this.translate.instant('NOTIFICATIONS_INVALID_FILE'));

        return;
      }

      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;

        subscriber.next(result);
      };

      fileReader.onerror = (event: ProgressEvent) => {
        subscriber.error(event);
      };

      fileReader.readAsText(file);
    });
  };
}
