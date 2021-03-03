import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {
  @Input() accept = 'text/plain'; // TODO create enum for accept types
  @Output() readonly uploaded = new EventEmitter<File>();

  upload = (event: any): void => {
    // TODO fix a bug, after clear the upload doesn't work
    if (!event?.target?.files?.length) {
      return;
    }

    const file = event.target.files[0] as File;

    this.uploaded.emit(file);
  };
}
