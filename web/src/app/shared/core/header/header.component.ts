import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  toogle = false;
  subject_profile: any = null;
  profile: any = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.subject_profile = this.userService._profileChanged.subscribe((res: any) => {
      this.profile = res;
    });
  }

  toogleMenu() {
    this.toogle = !this.toogle;
  }

  ngOnDestroy() {
    if (this.subject_profile) {
      this.subject_profile.unsubscribe();
    }
  }

}
