// image-upload.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private imageSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  currentImage = this.imageSource.asObservable();

  private masksSource = new BehaviorSubject<string[]>([]);
  masks = this.masksSource.asObservable();

  private hoveredMaskSource = new BehaviorSubject<string | null>(null);
  hoveredMask = this.hoveredMaskSource.asObservable();

  private selectedMasksSource = new BehaviorSubject<string[]>([]);
  selectedMasks = this.selectedMasksSource.asObservable();

  constructor(private http: HttpClient) {}

  uploadImage(file: File): void {
    const formData: FormData = new FormData();
    formData.append('image', file);
    this.imageSource.next('../assets/images/loading.gif');

    this.http.post<any>('/upload', formData).subscribe((response: any) => {
      this.imageSource.next(`/uploads/${response.image}`);
      const maskUrls: string[] = response.masks.map((mask: string) => `/output_masks/${mask}`);
      this.masksSource.next(maskUrls);
    });
  }

  changeImage(image: string | ArrayBuffer | null) {
    this.imageSource.next(image);
  }

  setMasks(masks: string[]) {
    this.masksSource.next(masks);
  }

  setHoveredMask(mask: string | null) {
    this.hoveredMaskSource.next(mask);
  }

  setSelectedMasks(selectedMasks: string[]) {
    this.selectedMasksSource.next(selectedMasks);
  }

  deleteSelectedMasks(selectedMasks: string[]) {
    const updatedMasks = this.masksSource.value.filter(mask => !selectedMasks.includes(mask));
    this.masksSource.next(updatedMasks);
    this.selectedMasksSource.next([]);
  }

  keepSelectedMasks(selectedMasks: string[]) {
    const updatedMasks = this.masksSource.value.filter(mask => selectedMasks.includes(mask));
    this.masksSource.next(updatedMasks);
  }
}
