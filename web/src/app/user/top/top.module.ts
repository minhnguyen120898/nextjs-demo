import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopService } from './top.service';
import { TopComponent } from './top/top.component';
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
  ],
  providers: [
    TopService
  ]
})
export class TopModule { }