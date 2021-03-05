import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {
  @Input() accept = 'text/plain'; // TODO create enum for accept types
  @Output() readonly uploaded = new EventEmitter<File>();

  upload = (event: Event): void => {
    const eventTarget = event.target as HTMLInputElement;
    // TODO fix a bug, after clear the upload doesn't work
    if (!eventTarget?.files?.length) {
      return;
    }

    const file = eventTarget.files[0];

    this.uploaded.emit(file);
  };
}
