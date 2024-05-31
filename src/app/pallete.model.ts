import { Color } from './color.model';

export interface Palette {
  name: string;
  isVisible: boolean;
  colors: Color[];
}