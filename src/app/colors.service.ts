import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Palette } from './pallete.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) { }

  getColours(): Observable<Palette[]> {
    const res: Observable<Palette[]> = this.http.get<any>('http://localhost:3000/api/colors').pipe(
      map(data => data.palettes) // Ensure we are using the correct field
    ); 

    return res;
  }
}
