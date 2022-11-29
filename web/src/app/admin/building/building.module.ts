import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './building/building.component';
import { BuildingCreateComponent } from './building-create/building-create.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BuildingComponent
  },
  {
    path: 'create',
    component: BuildingComponent
  },
  {
    path: 'update/:id',
    component: BuildingComponent
  }
]


@NgModule({
  declarations: [
    BuildingComponent,
    BuildingCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BuildingModule { }
