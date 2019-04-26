import { Component, Input, EventEmitter ,Output } from '@angular/core';
 
@Component({
  selector: 'ht-add-avocados',
  templateUrl: './add-avocados.component.html',
  styleUrls: [
    './add-avocados.component.scss'
  ]
})

export class AddAvocadosComponent {
  @Input() rating:number = 0;
  @Input() readOnly = false;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  rate(index: number) {
    if (!this.readOnly && index >= 1 && index <= 5) {
      this.rating = index;
      this.ratingChange.emit(this.rating);
    }
  }

  getOpacity (index: number): any {
    if (index > this.rating) { //Is the selected index is above the rating
      return 0.5;
    } else {
      return 1;
    }
  }
}