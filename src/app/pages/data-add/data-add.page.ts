import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-data-add',
  templateUrl: './data-add.page.html',
  styleUrls: ['./data-add.page.scss'],
})
export class DataAddPage implements OnInit {

  public dataForm: FormGroup;

  constructor(
    private dataService: DataService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

  ) {
    this.dataForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  async createItem(): Promise<void> {
    console.log('create')
    const title = this.dataForm.value.title;
    const message = this.dataForm.value.message;
    const loading = await this.loadingCtrl.create();

    this.dataService
      .createItem(title, message)
      .then(
        () => {
          console.log('created')
          loading.dismiss().then(() => {
            this.router.navigateByUrl('/data');
          });
        },
        error => {
          console.error(error);
        }
      );
    return await loading.present();
  }

}
