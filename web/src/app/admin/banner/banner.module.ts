import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';
import { TableModule } from 'src/app/shared/components/table/table.module';


const routes: Routes = [
  {
    path: '',
    component: BannerComponent
  }
]


@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    HeaderPageModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropdDownModule
  ]
})
export class BannerModule { }
