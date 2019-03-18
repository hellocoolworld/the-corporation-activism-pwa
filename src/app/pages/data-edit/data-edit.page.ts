import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.page.html',
  styleUrls: ['./data-edit.page.scss'],
})
export class DataEditPage implements OnInit {
  public dataForm: FormGroup;
  public id: any;
  public item: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private alertController : AlertController,
    private toastController :ToastController 

  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getItem(this.id);

    this.dataForm = formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  // get item from firestore and display in the form
  async getItem(id) {
    const loading = await this.loadingController.create();
    this.dataService.getItem(id)
      .get()
      .subscribe(user => {
        loading.dismiss().then(() => {
          this.item = user.data;
          this.dataForm.get('title').setValue(user.data().title);
          this.dataForm.get('message').setValue(user.data().message);
        });
      })
    return await loading.present();
  }

  // update item to firestore
  async updateItem(): Promise<void> {
    const loading = await this.loadingController.create();

    const title = this.dataForm.value.title;
    const message = this.dataForm.value.message;
    
    this.dataService
      .updateItem(this.id, title, message)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.updateMsg();
            this.router.navigateByUrl('tabs/data');
          });
        },
        error => {
          console.error(error);
        }
      );
    return await loading.present();
  }

  async updateMsg() {
    const toast = await this.toastController.create({
      message: 'Item Updated',
      duration: 1000,
      position: 'middle',
      color: 'secondary'
    });
    toast.present();
  }

  async confirmToDelete() {
    const alert = await this.alertController.create({
      header: 'Delete Item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteItem()
          }
        }
      ]
    });
    await alert.present();
  }

  // delete item from firestore
  async deleteItem(): Promise<void> {
    const loading = await this.loadingController.create();

    const title = this.dataForm.value.title;
    const message = this.dataForm.value.message;
   
    this.dataService
      .deleteItem(this.id)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.deleteMsg();
            this.router.navigateByUrl('tabs/data');
          });
        },
        error => {
          console.error(error);
        }
      );
    return await loading.present();
  }

  async deleteMsg() {
    const toast = await this.toastController.create({
      message: 'Item deleted',
      duration: 1000,
      position: 'middle',
      color: 'secondary'
    }); 
    toast.present();
  }

}
