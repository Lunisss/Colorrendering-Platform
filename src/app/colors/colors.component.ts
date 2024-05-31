import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ColorsService } from '../colors.service';
import { BrowserModule } from '@angular/platform-browser';
import { Palette } from '../pallete.model';


@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent implements OnInit {
  colorsData: Palette[] = [];

  constructor(private colorsService: ColorsService) { }

  ngOnInit(): void {
    this.colorsService.getColours().subscribe((colorsData: Palette[]) => {
      this.colorsData = colorsData;
      this.colorsData.forEach(palette => {
        if (palette.colors) { // Check if colors is defined
          palette.colors.forEach(color => {
            console.log(`Code: ${color.code}, Name: ${color.name}, Color: ${color.color}`);
          });
        }
      });
    },
    error => {
      console.error('Error fetching palettes:', error);
    }
  );
  }
  
  toggleVisibility(sec: any): void {
    sec.isVisible = !sec.isVisible;
  }

  onDragStart(event: any, color: string) {
    event.dataTransfer.setData('text/plain', color);
  }
}
