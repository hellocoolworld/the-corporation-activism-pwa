import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { AuthorBioModal, AddPledgeModal, HelpActionPledgeModal, HelpAvocadometerModal } from 'src/app/modals';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.page.html',
  styleUrls: ['./trailer.page.scss'],
})
export class TrailerPage implements OnInit {
  userAvocados: number;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }


  


}
