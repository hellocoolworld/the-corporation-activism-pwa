import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-avocados',
  templateUrl: './add-avocados.component.html',
  styleUrls: ['./add-avocados.component.scss'],
})
export class AddAvocadosComponent implements OnInit {

  @Input() rating = 0;
  @Input() readOnly = false;

  // @todo casting EventEmitter as number?
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
  }

  rate(index: number) {
    if (!this.readOnly && index >= 1 && index <= 5) {
    //   console.log('index=>', index, 'rating=>', this.rating);
      if (index === this.rating) { // If the selected avocado clicked again, then unselect that one avocado
        this.rating = index - 1;
      } else {
        this.rating = index;
      }
      this.ratingChange.emit(this.rating);
    }
  }

  getOpacity(index: number): any {
    if (index > this.rating) { // Is the selected index is above the rating
      return 0.5;

    } else {
      return 1;
    }
  }
}
