import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  public list: Observable<any>;

  constructor(
    private dataervice: DataService
  ) {
    // get item listing
    this.list = this.dataervice.getItemList().valueChanges()

  }

  ngOnInit() {
  }

}