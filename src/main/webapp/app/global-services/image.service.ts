import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/';
const CLOUD_NAME = 'dsx9svdes';
const UPLOAD_RESET = 'home_building';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  public uploadImage(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_RESET);
    data.append('cloud_name', CLOUD_NAME);
    return this.httpClient.post(CLOUDINARY_URL + CLOUD_NAME + '/image/upload', data);
  }
}
