import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BannerModule } from "src/app/shared/components/banner/banner.module";
import { CreateModelComponent } from './create-model/create-model.component';

export const routes: Routes = [
  { path: 'create', component: CreateModelComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    TranslateModule.forChild()
  ],
  declarations: [
    CreateModelComponent
  ]
})

export class CousreModule {}