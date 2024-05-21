import { Component } from '@angular/core';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent {
  data = [
    {'color': [255, 0, 0], "name": "red"},
    {'color': [0, 255, 0], "name": "green"},
    {'color': [0, 0, 255], "name": "blue"},
    {'color': [255, 255, 255], "name": "white"},
  ];
}
