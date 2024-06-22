import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private imageSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  currentImage = this.imageSource.asObservable();

  constructor() { }

  changeImage(image: string | ArrayBuffer | null) {
    this.imageSource.next(image);
  }
}
