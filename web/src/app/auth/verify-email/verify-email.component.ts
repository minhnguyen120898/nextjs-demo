import { Component, OnInit } from '@angular/core';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  res_mess = 'REGISTER.SEND_EMAIL';
  constructor(
    private componentAction: ComponentActions,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleVerifyMail() {
    this.componentAction.showLoading();
    let email = 'email';
    this.authService.verifyEmail(email).subscribe(
      res => {
        this.res_mess = res.message;
        this.componentAction.hideLoading();
      },
      err => {
        this.res_mess = err.errors.message;
        this.componentAction.hideLoading();
      }
    );
  }

}
