import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BannerModule } from "src/app/shared/components/banner/banner.module";
import { CreateModelComponent } from './create-model/create-model.component';
import { ViewModelComponent } from './view-model/view-model.component';

export const routes: Routes = [
  { path: 'create', component: CreateModelComponent },
  { path: 'view', component: ViewModelComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    TranslateModule.forChild()
  ],
  declarations: [
    CreateModelComponent,
    ViewModelComponent
  ]
})

export class CousreModule {}