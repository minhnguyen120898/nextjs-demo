import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';

const routes: Routes = [
  {
    path: '',
    component: TagComponent
  },
  {
    path: 'create',
    component: TagDetailComponent
  },
  {
    path: 'update/:id',
    component: TagDetailComponent
  }
]

@NgModule({
  declarations: [
    TagComponent,
    TagDetailComponent,
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
export class TagModule { }
