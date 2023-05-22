import { Component, Input, OnInit } from '@angular/core';
import { COLORS, Colors } from '@models/color.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() color: Colors = 'sky';

  get colors() {
    return COLORS[this.color] || {};
  }
}
