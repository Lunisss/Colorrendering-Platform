import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';
import { PictureComponent } from './picture/picture.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorsComponent, PictureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Colorrendering-Platform';
  
}
