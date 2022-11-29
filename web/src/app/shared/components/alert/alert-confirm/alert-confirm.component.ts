import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CrudType } from '../../../enums/crud-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from 'src/app/shared/enums/utils';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss'],
  providers: [
    TranslateService
  ]
})
export class AlertConfirmComponent implements OnInit {
  @Input() alert : any;
  @Input() show_input = false;
  @Output() handleClose = new EventEmitter();
  @Output() handleSave = new EventEmitter();
  @Output() handleKeyup = new EventEmitter();
  @Output() handleSuccess = new EventEmitter();

  CrudType = CrudType;
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.handleClose.emit(this.alert);
  }

  save() {
    this.handleSave.emit(this.alert);
  }

  key(value : string) {
    this.handleSave.emit(value);
  }

  success() {
    this.handleSuccess.emit(this.alert);
  }

  coppy(text : string){
    this.handleSuccess.emit({
      ...this.alert,
      coppy: text
    });
  }

}
