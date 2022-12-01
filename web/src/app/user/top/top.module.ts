import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopService } from './top.service';
import { TopComponent } from './top/top.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  {
    path: '', component: TopComponent
  }
];

@NgModule({
  declarations: [
    TopComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CarouselModule,
  ],
  providers: [
    TopService
  ]
})
export class TopModule { }