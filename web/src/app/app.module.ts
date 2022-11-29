import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routing } from './app.routing';
import { PageErrorComponent } from './page-error/page-error.component';
import { LayoutModule } from './shared/layout/layout.module';
import { AlertModule } from './shared/components/alert/alert.module';
import { UploadModule } from './shared/components/upload/upload.module';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    LayoutModule,
    AlertModule
  ],
  providers: [
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
