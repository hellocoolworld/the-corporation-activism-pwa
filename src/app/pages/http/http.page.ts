import { Component, OnInit } from '@angular/core';

// Service Http Provider at src/app/services/http.service.ts
import { HttpService } from '../../services/http.service';

// Capacitor Browser Plugin
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;


@Component({
  selector: 'app-http',
  templateUrl: './http.page.html',
  styleUrls: ['./http.page.scss'],
})

export class HttpPage implements OnInit {
  public news : any;
  public country : any;

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this. getNews("my");
  }

  getNews(country) {
    // get data from Http Service Provider
    this.country = country
    this.httpService.getNewsApi(country)
      .then(data => {
        this.news = data;
        this.news = this.news.articles;
        //console.log(this.news);
      });
  }

  async visit(url): Promise<any> {
    console.log(url)
    await Browser.open({ url: url });
  }

}
