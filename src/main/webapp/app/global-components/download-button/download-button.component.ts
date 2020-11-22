import { Component, Input, OnInit } from '@angular/core';
import { DocumentControllerService } from '../../entities/document/document-controller.service';
import { IDocument } from '../../shared/model/document.model';
import { HttpResponse } from '@angular/common/http';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-download-button',
  templateUrl: './download-button.component.html',
})
export class DownloadButtonComponent implements OnInit {
  @Input() propertyId: number;
  @Input() fileName: string;
  @Input() classes: string;
  iconDownload = faDownload;
  currentDocument?: IDocument;
  constructor(private service: DocumentControllerService) {
    this.propertyId = 0;
    this.fileName = 'contrato.pdf';
    this.classes = 'btn btn-sm btn-icon btn-primary';
  }

  ngOnInit(): void {
    if (this.propertyId != 0) {
      this.service.getDocumentByPropertyId(this.propertyId).subscribe((response: HttpResponse<IDocument>) => {
        this.currentDocument = response.body || undefined;
      });
    } else {
      console.error('Pass [propertyId] in the component to download');
    }
  }

  downloadFile(): void {
    if (this.currentDocument != undefined) {
      let blob = this.base64ToBlob(this.currentDocument.base64Code, 'text/plain');
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = this.fileName;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } else {
      console.error('Property document NOT FOUND!');
    }
  }

  protected base64ToBlob(b64Data: string, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, '');
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
