import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadService } from '../image-upload.service';
import { ColorManipulationService, Color, Solver } from '../color-manipulation.service';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  filter: string = '';

  constructor(
    private imageUploadService: ImageUploadService,
    private colorManipulationService: ColorManipulationService
  ) { }

  ngOnInit(): void {
    this.imageUploadService.currentImage.subscribe(image => {
      this.imageSrc = image;
    });
  }

  onDragOver(event: any) {
    event.preventDefault(); 
  }

  onDrop(event: any) {
    event.preventDefault();
    const colorHex = event.dataTransfer.getData('text/plain');
    if (colorHex && this.imageSrc) {
      const rgb = this.colorManipulationService.hexToRgb(colorHex);
      if (rgb) {
        const color = new Color(rgb[0], rgb[1], rgb[2]);
        const solver = new Solver(color);
        const result = solver.solve();
        this.filter = result.filter;
      }
    }
  }
}
