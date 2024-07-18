// picture.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadService } from '../image-upload.service';
import { ColorManipulationService, Color, Solver } from '../color-manipulation.service';
import { MaskSelectionService } from '../mask-selection.service';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  masks: string[] = [];
  hoveredMask: string | null = null;
  selectedMasks: string[] = [];
  filter: string[] = [];

  constructor(
    private imageUploadService: ImageUploadService,
    private colorManipulationService: ColorManipulationService,
    private maskSelectionService: MaskSelectionService
  ) { }

  ngOnInit(): void {
    this.imageUploadService.currentImage.subscribe(image => {
      this.imageSrc = image;
      if(this.imageSrc && this.imageSrc!='../assets/images/loading.gif') {
        this.maskSelectionService.showMaskSelection();
      }
    });

    this.imageUploadService.masks.subscribe(masks => {
      this.filter = [];
      this.masks = masks;
    });

    this.imageUploadService.hoveredMask.subscribe(mask => {
      this.hoveredMask = mask;
    });

    this.imageUploadService.selectedMasks.subscribe(selectedMasks => {
      this.selectedMasks = selectedMasks;
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
        for(let i = 0; i<this.selectedMasks.length; i++) {
          this.filter[this.masks.indexOf(this.selectedMasks[i])] = result.filter;
        }
      }
    }
  }

  isHovered(mask: string): boolean {
    return this.hoveredMask === mask;
  }

  isSelected(mask: string): boolean {
    return this.selectedMasks.includes(mask);
  }

}
