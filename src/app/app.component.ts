import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';
import { PictureComponent } from './picture/picture.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MaskSelectionComponent } from './mask-selection/mask-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorsComponent, PictureComponent, NavbarComponent, MenuComponent, HttpClientModule, MaskSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Colorrendering-Platform';
  
}
