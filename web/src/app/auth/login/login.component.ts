import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthService } from '../auth.service';
import { EncodeDecodeService } from 'src/app/shared/services/helpers/encode-decode.service';
import { Utils } from 'src/app/shared/enums/utils';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    private encodeService: EncodeDecodeService

  ) { }

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
      this.componentAction.showLoading();
      this.authService.login(
        this.encodeService.encode(`${this.formLogin.value.email}:${this.formLogin.value.password}`)).subscribe(
          res => {
            this.userService.setToken(res.token);
            this.userService.login(true);
            this.componentAction.hideLoading();
          },
          err => {
            this.componentAction.showPopup({ title: Utils.TITLE_ERROR, message: err.errors.message, mode: CrudType.CLOSE });
            this.componentAction.hideLoading();
          }
        );
    }
  }

  save() {
  }
}