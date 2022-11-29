import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ModelSearchComponent } from './model-search/model-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectDropdDownModule } from '../select-dropdown/select-drop.module';
import { TableElementComponent } from './table-element/table-element.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        SelectDropdDownModule
    ],
    declarations: [
        DataTableComponent,
        ModelSearchComponent,
        TableElementComponent
    ],
    exports: [
        DataTableComponent,
        ModelSearchComponent,
        TableElementComponent
    ]
})
export class TableModule { }
