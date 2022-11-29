import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRouting } from './auth.routing';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '../shared/layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRouting,
        LayoutModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forChild()
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        VerifyEmailComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
