import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './building/building.component';
import { BuildingCreateComponent } from './building-create/building-create.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderPageModule } from 'src/app/shared/components/header-page/header-page.module';
import { SelectDropdDownModule } from 'src/app/shared/components/select-dropdown/select-drop.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { DatePickerModule } from 'src/app/shared/components/date-picker/date-picker.module';

const routes: Routes = [
  {
    path: '',
    component: BuildingComponent
  },
  {
    path: 'create',
    component: BuildingCreateComponent
  },
  {
    path: 'update/:id',
    component: BuildingCreateComponent
  }
]


@NgModule({
  declarations: [
    BuildingComponent,
    BuildingCreateComponent
  ],
  imports: [
    CommonModule,
    HeaderPageModule,
    RouterModule.forChild(routes),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropdDownModule,
    DatePickerModule
  ]
})
export class BuildingModule { }
