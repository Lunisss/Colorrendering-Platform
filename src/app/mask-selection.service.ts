// mask-selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaskSelectionService {
  private maskSelectionVisible = new BehaviorSubject<boolean>(false);
  maskSelectionVisible$ = this.maskSelectionVisible.asObservable();

  private masks = new BehaviorSubject<string[]>([]);
  masks$ = this.masks.asObservable();

  showMaskSelection() {
    this.maskSelectionVisible.next(true);
  }

  hideMaskSelection() {
    this.maskSelectionVisible.next(false);
  }
}
