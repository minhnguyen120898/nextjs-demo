import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { DetailNoticeComponent } from './detail-notice/detail-notice.component';
const routes: Routes = [
  {
    path: '',
    component: NoticeComponent
  },
  {
    path: 'create',
    component: DetailNoticeComponent
  },
  {
    path: 'update/:id',
    component: DetailNoticeComponent
  }
]


@NgModule({
  declarations: [
    NoticeComponent,
    DetailNoticeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropdDownModule,
    HeaderPageModule
  ]
})
export class NoticeModule { }
