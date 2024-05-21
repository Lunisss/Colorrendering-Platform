import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Colorrendering-Platform';
  
}
