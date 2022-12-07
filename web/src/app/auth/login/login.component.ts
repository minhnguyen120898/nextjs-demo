import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthService } from '../auth.service';
import { EncodeDecodeService } from 'src/app/shared/services/helpers/encode-decode.service';
import { Utils } from 'src/app/shared/enums/utils';
import { environment as config } from 'src/environments/environment';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { UserRole } from 'src/app/shared/enums/user-role';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeAdmin: boolean = false;

  formLogin: FormGroup | any;
  formErrors = {
    email: '',
    password: ''
  };
  validationMessages = {
    email: {
      required: 'VALIDATION.MAIL_REQUIRED',
      pattern: 'VALIDATION.MAIL_PATTERN',
    },
    password: {
      required: 'VALIDATION.PASSWORD_REQUIRED',
      minlength: 'VALIDATION.PASSWORD_MIN',
      maxlength: 'VALIDATION.PASSWORD_MAX',
    }
  };

  constructor(
    private formbuilder: FormBuilder,
    private validationService: ValidationService,
    private componentAction: ComponentActions,
    private userService: UserService,
    private authService: AuthService,
    private encodeService: EncodeDecodeService,
    private router: Router

  ) { 
    this.typeAdmin = location.pathname.indexOf(config.routerLoginAdmin) > -1 ? true : false;
  }

  ngOnInit() {
    this.initForm();
    this.componentAction.subject_save.subscribe(
      res => {
        this.save();
      }
    );
    this.componentAction.subject_text.subscribe(
      res => {
      }
    );
  }

  initForm() {
    this.formLogin = this.formbuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        email: ['', [Validators.required, Validators.pattern(this.validationService.pattern_email)]]
      },
    );
    this.formLogin.valueChanges.subscribe((data : object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validationService.getValidate(this.formLogin, this.formErrors, this.validationMessages);
  }

  handleLogin() {
    if (this.formLogin.invalid) {
    this.formErrors = this.validationService.checkErorrNotDiry(this.formLogin, this.formErrors, this.validationMessages);
    }
    if (this.formLogin.valid) {
      const auth =
      this.encodeService.encode(`${this.formLogin.value.email}:${this.formLogin.value.password}:${this.typeAdmin ? UserRole.ADMIN: UserRole.NORMAL}`);
    this.componentAction.showLoading();
    this.authService.login(auth).subscribe(
      res => {
        console.log(res);
        
        this.componentAction.hideLoading();
          this.userService.setToken(res.token);
          this.userService.login(true);
          if(this.typeAdmin){
            this.router.navigateByUrl(`/${config.routerLoginAdmin}`);
          }
      },
      err => {
        console.log(err);
        
        this.componentAction.showPopup({ title: Utils.TITLE_ERROR, message: err.errors.message, mode: CrudType.CLOSE });
        this.componentAction.hideLoading();
      }
    );
    }
  }

  save() {
  }
}