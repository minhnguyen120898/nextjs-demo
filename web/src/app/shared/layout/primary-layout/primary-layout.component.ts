import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as config } from 'src/environments/environment';
import { UserRole } from '../../enums/user-role';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss']
})
export class PrimaryLayoutComponent implements OnInit {
  toogle = false;

  nav: any[] = [];


  navAdmin = [
    {
      id: 1,
      name: '会員一覧',
      isCollapsed: true,
      link: `/${config.routerLoginAdmin}/members`,
      img: `
      <svg style="margin-right: 2rem;fill:#707070"  xmlns="http://www.w3.org/2000/svg" width="25" height="15.909" viewBox="0 0 25 15.909">
      <path id="Icon_material-people" data-name="Icon material-people" d="M18.545,14.318a3.409,3.409,0,1,0-3.409-3.409A3.395,3.395,0,0,0,18.545,14.318Zm-9.091,0a3.409,3.409,0,1,0-3.409-3.409A3.395,3.395,0,0,0,9.455,14.318Zm0,2.273c-2.648,0-7.955,1.33-7.955,3.977v2.841H17.409V20.568C17.409,17.92,12.1,16.591,9.455,16.591Zm9.091,0c-.33,0-.7.023-1.1.057a4.8,4.8,0,0,1,2.239,3.92v2.841H26.5V20.568C26.5,17.92,21.193,16.591,18.545,16.591Z" transform="translate(-1.5 -7.5)" fill="#707070"/>
    </svg>`,
      sub_nav: [

      ]
    },
    {
      id: 1,
      name: 'プラン設計',
      isCollapsed: true,
      link: `/${config.routerLoginAdmin}/plan`,
      img: `
      <svg class="hovesvg"  style="margin-right: 2rem" xmlns="http://www.w3.org/2000/svg" width="25" height="22.222" viewBox="0 0 25 22.222">
  <path id="Icon_awesome-plane" data-name="Icon awesome-plane" d="M20.834,8.333H15.873L11.311.35a.7.7,0,0,0-.6-.35H7.865A.694.694,0,0,0,7.2.885L9.326,8.333H4.861l-1.875-2.5a.7.7,0,0,0-.556-.278H.695a.694.694,0,0,0-.674.863l1.368,4.693L.021,15.8a.694.694,0,0,0,.674.863H2.431a.694.694,0,0,0,.556-.278l1.875-2.5H9.326L7.2,21.337a.7.7,0,0,0,.668.885h2.843a.7.7,0,0,0,.6-.35l4.562-7.984h4.961c1.534,0,4.167-1.243,4.167-2.778S22.368,8.333,20.834,8.333Z" transform="translate(0)" fill="#707070"/>
</svg>`,
      sub_nav: [

      ]
    },
    {
      id: 2,
      name: '施設一覧',
      img: `<svg class="hovesvg"  style="margin-right: 2rem"  xmlns="http://www.w3.org/2000/svg" width="21.875" height="25" viewBox="0 0 21.875 25">
      <path id="Icon_awesome-building" data-name="Icon awesome-building" d="M21.289,23.438h-.977V1.172A1.172,1.172,0,0,0,19.141,0H2.734A1.172,1.172,0,0,0,1.563,1.172V23.438H.586A.586.586,0,0,0,0,24.023V25H21.875v-.977A.586.586,0,0,0,21.289,23.438ZM6.25,3.711a.586.586,0,0,1,.586-.586H8.789a.586.586,0,0,1,.586.586V5.664a.586.586,0,0,1-.586.586H6.836a.586.586,0,0,1-.586-.586Zm0,4.688a.586.586,0,0,1,.586-.586H8.789a.586.586,0,0,1,.586.586v1.953a.586.586,0,0,1-.586.586H6.836a.586.586,0,0,1-.586-.586Zm2.539,7.227H6.836a.586.586,0,0,1-.586-.586V13.086a.586.586,0,0,1,.586-.586H8.789a.586.586,0,0,1,.586.586v1.953A.586.586,0,0,1,8.789,15.625ZM12.5,23.438H9.375v-4.1a.586.586,0,0,1,.586-.586h1.953a.586.586,0,0,1,.586.586Zm3.125-8.4a.586.586,0,0,1-.586.586H13.086a.586.586,0,0,1-.586-.586V13.086a.586.586,0,0,1,.586-.586h1.953a.586.586,0,0,1,.586.586Zm0-4.687a.586.586,0,0,1-.586.586H13.086a.586.586,0,0,1-.586-.586V8.4a.586.586,0,0,1,.586-.586h1.953a.586.586,0,0,1,.586.586Zm0-4.687a.586.586,0,0,1-.586.586H13.086a.586.586,0,0,1-.586-.586V3.711a.586.586,0,0,1,.586-.586h1.953a.586.586,0,0,1,.586.586Z" fill="#707070"/>
    </svg>`,
      link: `/${config.routerLoginAdmin}/building`,
      sub_nav: [
        {
          sub_name: '施設をする',
          url_sub: `/${config.routerLoginAdmin}/building/create`,
          style: true
        }
      ]
    },
    {
      id: 3,
      name: 'カテゴリー',
      link: `/${config.routerLoginAdmin}/category`,
      img: `
      <svg style="margin-right: 2rem"  xmlns="http://www.w3.org/2000/svg" width="25" height="20.313" viewBox="0 0 25 20.313">
  <path id="Icon_awesome-list" data-name="Icon awesome-list" d="M3.906,19H.781A.781.781,0,0,0,0,19.781v3.125a.781.781,0,0,0,.781.781H3.906a.781.781,0,0,0,.781-.781V19.781A.781.781,0,0,0,3.906,19Zm0-15.625H.781A.781.781,0,0,0,0,4.156V7.281a.781.781,0,0,0,.781.781H3.906a.781.781,0,0,0,.781-.781V4.156A.781.781,0,0,0,3.906,3.375Zm0,7.813H.781A.781.781,0,0,0,0,11.969v3.125a.781.781,0,0,0,.781.781H3.906a.781.781,0,0,0,.781-.781V11.969A.781.781,0,0,0,3.906,11.188Zm20.313,8.594H8.594a.781.781,0,0,0-.781.781v1.563a.781.781,0,0,0,.781.781H24.219A.781.781,0,0,0,25,22.125V20.563A.781.781,0,0,0,24.219,19.781Zm0-15.625H8.594a.781.781,0,0,0-.781.781V6.5a.781.781,0,0,0,.781.781H24.219A.781.781,0,0,0,25,6.5V4.938A.781.781,0,0,0,24.219,4.156Zm0,7.813H8.594a.781.781,0,0,0-.781.781v1.563a.781.781,0,0,0,.781.781H24.219A.781.781,0,0,0,25,14.313V12.75A.781.781,0,0,0,24.219,11.969Z" transform="translate(0 -3.375)" fill="#707070"/>
</svg>
      `,
      sub_nav: [
      ]
    },
    {
      id: 3,
      name: 'タグ',
      link: `/${config.routerLoginAdmin}/tag`,
      img: `
      <svg  class="hovesvg" style="margin-right: 2rem"  xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20">
  <path id="Icon_awesome-tags" data-name="Icon awesome-tags" d="M19.451,8.826,11.174.549A1.875,1.875,0,0,0,9.848,0H1.875A1.875,1.875,0,0,0,0,1.875V9.848a1.875,1.875,0,0,0,.549,1.326l8.277,8.277a1.875,1.875,0,0,0,2.652,0l7.973-7.973a1.875,1.875,0,0,0,0-2.652ZM4.375,6.25A1.875,1.875,0,1,1,6.25,4.375,1.875,1.875,0,0,1,4.375,6.25Zm20.076,5.227-7.973,7.973a1.875,1.875,0,0,1-2.652,0l-.014-.014,6.8-6.8a3.516,3.516,0,0,0,0-4.972L12.945,0h1.9a1.875,1.875,0,0,1,1.326.549l8.277,8.277a1.875,1.875,0,0,1,0,2.652Z" fill="#707070"/>
</svg>
      `,
      sub_nav: [
      ]
    },
    {
      id: 4,
      name: 'お知らせ',
      link: `/${config.routerLoginAdmin}/notice`,
      img: `
      <svg  class="hovesvg" style="margin-right: 2rem"  xmlns="http://www.w3.org/2000/svg" width="25" height="22.222" viewBox="0 0 25 22.222">
  <path id="Icon_awesome-bullhorn" data-name="Icon awesome-bullhorn" d="M25,10.417a2.765,2.765,0,0,0-1.389-2.392V1.389A1.4,1.4,0,0,0,22.222,0a1.386,1.386,0,0,0-.867.3L17.664,3.257a10.534,10.534,0,0,1-6.553,2.3H2.778A2.778,2.778,0,0,0,0,8.333V12.5a2.778,2.778,0,0,0,2.778,2.778H4.24a10.547,10.547,0,0,0-.095,1.389,11,11,0,0,0,1.109,4.815,1.362,1.362,0,0,0,1.233.74H9.712a1.38,1.38,0,0,0,1.124-2.194A5.527,5.527,0,0,1,9.7,16.667a5.252,5.252,0,0,1,.191-1.389h1.219a10.532,10.532,0,0,1,6.553,2.3l3.691,2.953a1.388,1.388,0,0,0,2.256-1.084V12.809A2.766,2.766,0,0,0,25,10.417Zm-4.167,6.138L19.4,15.407A13.316,13.316,0,0,0,11.111,12.5V8.333A13.316,13.316,0,0,0,19.4,5.426l1.434-1.148Z" fill="#707070"/>
</svg>`,
      sub_nav: [
      ]
    },
    {
      id: 6,
      name: '広告設定',
      link: `/${config.routerLoginAdmin}/banner`,
      img: `
      <svg  class="hovesvg" style="margin-right: 2rem"  xmlns="http://www.w3.org/2000/svg" width="25" height="16.667" viewBox="0 0 25 16.667">
  <path id="Icon_awesome-newspaper" data-name="Icon awesome-newspaper" d="M23.958,4.5H3.819A1.042,1.042,0,0,0,2.778,5.542v.347H1.042A1.042,1.042,0,0,0,0,6.931V18.736a2.431,2.431,0,0,0,2.431,2.431H22.917A2.083,2.083,0,0,0,25,19.083V5.542A1.042,1.042,0,0,0,23.958,4.5ZM2.431,19.083a.347.347,0,0,1-.347-.347V7.972h.694V18.736A.347.347,0,0,1,2.431,19.083Zm10.243-.694h-6.6a.521.521,0,0,1-.521-.521v-.347A.521.521,0,0,1,6.076,17h6.6a.521.521,0,0,1,.521.521v.347A.521.521,0,0,1,12.674,18.389Zm9.028,0H15.1a.521.521,0,0,1-.521-.521v-.347A.521.521,0,0,1,15.1,17h6.6a.521.521,0,0,1,.521.521v.347A.521.521,0,0,1,21.7,18.389Zm-9.028-4.167h-6.6a.521.521,0,0,1-.521-.521v-.347a.521.521,0,0,1,.521-.521h6.6a.521.521,0,0,1,.521.521V13.7A.521.521,0,0,1,12.674,14.222Zm9.028,0H15.1a.521.521,0,0,1-.521-.521v-.347a.521.521,0,0,1,.521-.521h6.6a.521.521,0,0,1,.521.521V13.7A.521.521,0,0,1,21.7,14.222Zm0-4.167H6.076a.521.521,0,0,1-.521-.521V7.8a.521.521,0,0,1,.521-.521H21.7a.521.521,0,0,1,.521.521V9.535A.521.521,0,0,1,21.7,10.056Z" transform="translate(0 -4.5)" fill="#707070"/>
</svg>
      `,
      sub_nav: [
      ]
    },
    {
      id: 5,
      name: '担当設定',
      link: `/${config.routerLoginAdmin}/work`,
      img: `
      <svg class="hovesvg" style="margin-right: 2rem"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
  <path id="Icon_material-account-circle" data-name="Icon material-account-circle" d="M15.5,3A12.5,12.5,0,1,0,28,15.5,12.5,12.5,0,0,0,15.5,3Zm0,3.75a3.75,3.75,0,1,1-3.75,3.75A3.745,3.745,0,0,1,15.5,6.75Zm0,17.75A9,9,0,0,1,8,20.475c.037-2.488,5-3.85,7.5-3.85s7.463,1.363,7.5,3.85A9,9,0,0,1,15.5,24.5Z" transform="translate(-3 -3)" fill="#707070"/>
</svg>
      `,
      sub_nav: [
      ]
    },
  ];
  toggleNav = true;
  subject_profile: any = null;
  role: number = 0;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.subject_profile = this.userService._profileChanged.subscribe((res: any) => {
    //   if (res) {
    //     this.role = res.role;
    //     if (res.role == UserRole.NORMAL) {
    //       this.nav = [];
    //     }
    //     if (res.role == UserRole.ADMIN) {
    //       this.nav = this.navAdmin;
    //     }
    //   }
    // });
    this.nav = this.navAdmin;

    this.activeReload();
  }

  toggleMenu() {
    this.toogle = !this.toogle;
  }

  activeReload() {
    setTimeout(() => {
      const path = location.pathname;
      this.nav.forEach((element, key) => {
        if (path.indexOf(element.link) > -1) {
          element.active = true;
          if (element.sub_nav.length) {
            this.collapse(element, key);
          }
        }

      });
    });
  }

  async logout() {
    await this.userService.logout();
    location.reload();
  }

  clickNav(item: any, i: number) {
    if (item.logout) {
      this.logout();
      return;
    };
    this.nav.forEach(e => { e.active = false; });
    item.active = true;
    this.router.navigateByUrl(item.link);
    this.collapse(item, i)
  }

  collapse(item: any, indexItem: number) {
    let parent = document.getElementsByClassName('nav-child');
    for (let index = 0; index < parent.length; index++) {
      (parent[index] as HTMLElement).style.maxHeight = '0px';
    }
    if (item.sub_nav.length) {
      (parent[indexItem] as HTMLElement).style.maxHeight = parent[indexItem].scrollHeight + 'px';
    }
  }

  onToggleNav() {
    this.toggleNav = !this.toggleNav;
  }

  ngOnDestroy() {
    if (this.subject_profile) {
      this.subject_profile.unsubscribe();
    }
  }
}
