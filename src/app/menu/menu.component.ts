import { Component } from '@angular/core';
import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private imageUploadService: ImageUploadService) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUploadService.changeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
