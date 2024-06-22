import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})
export class PictureComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
    this.imageUploadService.currentImage.subscribe(image => {
      this.imageSrc = image;
    });
  }
}