import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

export const routes: Routes = [
  {
      path: '', component: CategoryComponent
  },
  {
    path: 'create',
    component: CategoryDetailComponent
  },
  {
    path: 'update/:id',
    component: CategoryDetailComponent
  }
];

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryDetailComponent
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
export class CategoryModule { }
