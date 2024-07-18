import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../image-upload.service';
import { CommonModule } from '@angular/common';
import { MaskSelectionService } from '../mask-selection.service';

@Component({
  selector: 'app-mask-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mask-selection.component.html',
  styleUrls: ['./mask-selection.component.scss']
})
export class MaskSelectionComponent implements OnInit {
  isVisible = false;
  masks: string[] = [];
  selectedMasks: string[] = [];

  constructor(private imageUploadService: ImageUploadService, private maskSelectionService: MaskSelectionService) {}

  ngOnInit() {
    this.imageUploadService.masks.subscribe(masks => {
      this.masks = masks;
    });

    this.imageUploadService.selectedMasks.subscribe(selectedMasks => {
      this.selectedMasks = selectedMasks;
    });
    this.maskSelectionService.maskSelectionVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }

  deleteSelectedMasks() {
    this.imageUploadService.deleteSelectedMasks(this.selectedMasks);
  }

  keepSelectedMasks() {
    this.imageUploadService.keepSelectedMasks(this.selectedMasks);
  }

  closeMaskSelection() {
    this.isVisible = false;
  }


  toggleMaskSelection(mask: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedMasks.push(mask);
    } else {
      const index = this.selectedMasks.indexOf(mask);
      if (index > -1) {
        this.selectedMasks.splice(index, 1);
      }
    }
    this.imageUploadService.setSelectedMasks(this.selectedMasks);
  }

  hoverMask(mask: string) {
    this.imageUploadService.setHoveredMask(mask);
  }

  unhoverMask() {
    this.imageUploadService.setHoveredMask(null);
  }
}
