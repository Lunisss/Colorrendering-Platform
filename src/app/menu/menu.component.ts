import { Component } from '@angular/core';
import { ImageUploadService } from '../image-upload.service';
import { MaskSelectionService } from '../mask-selection.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  selectingColor: boolean = false;
  
  constructor(
    private imageUploadService: ImageUploadService,
    private maskSelectionService: MaskSelectionService
  ) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUploadService.uploadImage(file);
    }
  }

  openMaskSelection() {
    this.maskSelectionService.showMaskSelection();
  }
}
