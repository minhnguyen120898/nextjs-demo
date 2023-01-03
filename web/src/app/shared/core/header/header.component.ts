import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription, tap, throttleTime } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        right: '0',
      })),
      state('closed', style({
        right: '-2000px'
      })),
      transition('open => closed', [
        animate('0.4s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  toogle = false;
  subject_profile: any = null;
  profile: any = null;

  isWhiteBackground = false;
  eventSub: Subscription;

  valueSearch = "";
  isShowSearchText = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.subject_profile = this.userService._profileChanged.subscribe((res: any) => {
      this.profile = res;
    });

    this.eventSub = fromEvent(window, 'scroll').pipe(
      throttleTime(70),
      tap(event => this.onScroll())
    ).subscribe();
  }

  toogleMenu() {
    this.toogle = !this.toogle;
  }

  ngOnDestroy() {
    if (this.subject_profile) {
      this.subject_profile.unsubscribe();
    }
  }

  onScroll() {
    const number = document.scrollingElement?.scrollTop || 0;
    if (number > 109) { 
      this.isWhiteBackground = true;
    } else {
      this.isWhiteBackground = false;
    }
  }

  showSearch() {
    this.isShowSearchText = !this.isShowSearchText;
    let searchEle = document.getElementById('search-text-header');
    if (this.isShowSearchText) {
      searchEle?.focus();
    } else {
      searchEle?.blur();
    }
  }

  search() {
    // call api search here
  }
}
