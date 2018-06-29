import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig } from 'ngx-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs/Subscription';

import { HomeComponent } from './home/home.component';
import { DocumentService } from './services/document.service';
import { SearchComponent } from './search/search.component';

import { Api } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DocumentService]
})
export class AppComponent implements OnInit {
  loggedIn: String;
  hostname: String;
  private sub: Subscription;
  constructor(private _router: Router,
              private cookieService: CookieService,
              private api: Api) {
    // Used for sharing links.
    this.hostname = api.hostnameMEM;

    PageScrollConfig.defaultScrollOffset = 50;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 8 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -8 * --t) + 2) + b;
      }
    };
  }

  ngOnInit() {
    this.loggedIn = this.cookieService.get('loggedIn');

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }
}
