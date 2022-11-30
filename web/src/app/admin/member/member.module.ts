import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member/member.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';
import { TableModule } from 'src/app/shared/components/table/table.module';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent
  },
  {
    path: 'create',
    component: MemberDetailComponent
  },
  {
    path: 'update/:id',
    component: MemberDetailComponent
  }
]

@NgModule({
  declarations: [
    MemberComponent,
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    HeaderPageModule,
    RouterModule.forChild(routes),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropdDownModule,
  ]
})
export class MemberModule { }
