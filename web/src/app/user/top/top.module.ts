import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopService } from './top.service';
import { TopComponent } from './top/top.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryDataComponent } from './category-data/category-data.component';
import { PanigationModule } from 'src/app/shared/components/panigation/panigation.module';
import { NoticeComponent } from './notice/notice.component';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { PipeCustomModule } from 'src/app/shared/pipe/pipe.module';

const routes: Routes = [
  {
    path: '', component: TopComponent
  },
  {
    path: 'category/:categoryid', component: CategoryDataComponent
  },
  {
    path: 'notice', component: NoticeComponent
  },
  {
    path: 'notice/:noticeid', component: NoticeDetailComponent
  }
];

@NgModule({
  declarations: [
    TopComponent,
    CategoryDataComponent,
    NoticeComponent,
    NoticeDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CarouselModule,
    PanigationModule,
    PipeCustomModule
  ],
  providers: [
    TopService
  ]
})
export class TopModule { }