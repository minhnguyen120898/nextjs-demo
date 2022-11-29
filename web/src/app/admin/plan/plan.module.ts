import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './plan/plan.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';
const routes: Routes = [
  {
    path: '',
    component: PlanComponent
  },
  {
    path: 'create',
    component: PlanDetailComponent
  },
  {
    path: 'update/:id',
    component: PlanDetailComponent
  }
]

@NgModule({
  declarations: [
    PlanComponent,
    PlanDetailComponent
  ],
  imports: [
    CommonModule,
    HeaderPageModule,
    RouterModule.forChild(routes),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropdDownModule
  ]
})
export class PlanModule { }
