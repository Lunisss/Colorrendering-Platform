import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})
export class PictureComponent {
  pictureColor: string = '#FFFFFF';

  allowDrop(event: any) {
    event.preventDefault();
    console.log("allowed");
  }

  onDrop(event: any) {
    event.preventDefault();
    const color = event.dataTransfer.getData('text/plain');
    this.pictureColor = color;
  }

}
