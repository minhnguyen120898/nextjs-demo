import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopService } from './top.service';
import { TopComponent } from './top/top.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryDataComponent } from './category-data/category-data.component';
import { PanigationModule } from 'src/app/shared/components/panigation/panigation.module';

const routes: Routes = [
  {
    path: '', component: TopComponent
  },
  {
    path: 'category/:categoryid', component: CategoryDataComponent
  }
];

@NgModule({
  declarations: [
    TopComponent,
    CategoryDataComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CarouselModule,
    PanigationModule
  ],
  providers: [
    TopService
  ]
})
export class TopModule { }