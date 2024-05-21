import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent {
  section = [
    {'name': 'pallete 1',
    isVisible: false,
    "colors": [
      {'color': 'red', "name": "Red"},
      {'color': '#00FF00', "name": "Green"},
      {'color': '#0000FF', "name": "Blue"},
      {'color': '#FFFFFF', "name": "White"},
      {'color': '#000000', "name": "Black"}
    ]},
    {'name': 'pallete 2',
    isVisible: false,
    "colors": [
      {'color': '#DD7373', "name": "Light coral"},
      {'color': '#3B3561', "name": "Space cadet"},
      {'color': '#EAD94C', "name": "Citrine"},
      {'color': '#D1D1D1', "name": "Timberwolf"},
    ]}
  ];



  toggleVisibility(sec: any): void {
    sec.isVisible = !sec.isVisible;
  }

  onDragStart(event: any, color: string) {
    event.dataTransfer.setData('text/plain', color);
  }
}
