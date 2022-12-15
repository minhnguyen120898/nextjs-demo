import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, NEW_STATUS, Utils } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { UploadFileService } from 'src/app/shared/services/helpers/upload-file.service';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-detail-notice',
  templateUrl: './detail-notice.component.html',
  styleUrls: ['./detail-notice.component.scss']
})
export class DetailNoticeComponent implements OnInit {


  pageInfo: any = {
    img: 'assets/images/icon-member.svg',
    title: 'お知らせ',
    is_seacrh: false,
    is_new: false,
    holder_search: '検索する',
    text_new: 'CSVダウンロード'
  }
  subject_save: any = null;
  subject_success: any = null;
  status = {
    list: [
      {
        itemName: '公衆',
        type: NEW_STATUS.PUBLIC
      },
      {
        itemName: 'プライベート',
        type: NEW_STATUS.PRIVATE
      }
    ],
    name_select: '- 選択してください'
  }

  formErrors = {
    status: '',
    title: '',
    image: '',
    content: '',
    meta_title: '',
    meta_description: ''
  };
  validationMessages = {
    status: {
      required: 'タイトルを入力してください',
      whitespace: '作成者を選択してください',
    },
    image: {
      required: '画像が必要です',
    },
    title: {
      required: 'タイトルを入力してください',
      whitespace: 'タイトルを入力してください',
    },
    content: {
      required: '本文を入力してください',
      whitespace: '本文を入力してください',
    },
    meta_title: {
      required: 'タイトル必須',
      whitespace: 'タイトル必須',
    },
    meta_description: {
      required: '修理が必要',
      whitespace: '修理が必要',
    }
  };
  formNotice: FormGroup = new FormGroup({});
  id: any = null;
  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private timeService: TimeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private validatorService: ValidationService,
    private uploadService: UploadFileService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getData();
    }
    this.subject_save = this.componentActions.subject_save.subscribe((res: any) => {
      if (res.action == ACTION_TYPE.CREATE) {
        this.create();
      }
      if (res.action == ACTION_TYPE.DELETE) {
        this.delete(res.id);
      }
    });

    this.subject_success = this.componentActions.subject_success.subscribe((res: any) => {
      if (res.back) {
        this.back()
      }
    });
  }

  getData() {
    this.componentActions.showLoading();
    this.adminService.getDetailNotice(this.id).subscribe(res => {
      this.formNotice.patchValue({
        status: res.status,
        title: res.title,
        content: res.content,
        image: res.image,
        meta_title: res.meta_title,
        meta_description: res.meta_description,
        type: res.type
      });
      // STATUS
      this.status.name_select = this.status.list.find(e => { return e.type == res.status })?.itemName || '';
      this.componentActions.hideLoading();
    }, err => {
      this.componentActions.hideLoading();
    })
  }

  back() {
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/notice`)
  }

  create() {
    const body = {
      ...this.formNotice.value
    }
   
    if (this.id) {
      this.componentActions.showLoading();
      this.adminService.updateNotice(body, this.id).subscribe(res => {
        this.componentActions.showPopup({
          message: 'お知らせの更新をしました',
          mode: CrudType.SUCCESS,
          class: 'btn-blue',
          back: true
        });
        this.componentActions.hideLoading();
      }, err => {
        this.componentActions.hideLoading();
        this.componentActions.showPopup({ title: Utils.TITLE_ERROR, message: err.errors.message, mode: CrudType.CLOSE });
      });
    } else {
      this.componentActions.showLoading();
      this.adminService.createNotice(body).subscribe(res => {
        this.componentActions.showPopup({
          message: 'お知らせを投稿しました',
          mode: CrudType.SUCCESS,
          class: 'btn-blue',
          back: true
        });
        this.componentActions.hideLoading();
      }, err => {
        this.componentActions.hideLoading();
        this.componentActions.showPopup({ title: Utils.TITLE_ERROR, message: err.errors.message, mode: CrudType.CLOSE });
      });
    }
  }


  initForm() {
    this.formNotice = this.formBuilder.group({
      status: ['', [Validators.required]],
      title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      image: ['', [Validators.required]],
      type: ['', []],
      content: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      meta_title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      meta_description: ['', [Validators.required, this.validatorService.noWhitespaceValidator]]
    });
    this.formNotice.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formNotice, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formNotice.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formNotice, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `【${this.formNotice.value.title}】\n
        このプランで保存しますか？`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.CREATE,
        text: 'はい'
      });
    }
  }

  handleDelete() {
    this.componentActions.showPopup({
      message: `【${this.formNotice.value.title}】\n削除しますか？`,
      mode: CrudType.CONFIRM,
      action: ACTION_TYPE.DELETE,
      id: this.id,
      text: 'はい'
    });
  }

  delete(id: any) {
    this.componentActions.showLoading();
    this.adminService.deleteNotice(id).subscribe(res => {
      this.componentActions.showPopup({
        message: 'タグを削除しました',
        mode: CrudType.SUCCESS,
        class: 'btn-blue',
        back: true,
        text: 'OK'
      });
      this.componentActions.hideLoading();
    }, err => {
      this.componentActions.showPopup({
        message: err.errors.message,
        mode: CrudType.CLOSE
      });
      this.componentActions.hideLoading();
    });
  }

  handleSetStatus(event: any) {
    this.status.name_select = event.value.itemName;
    this.formNotice.get('status')?.setValue(Number(event.value.type));
  }

  handleReset() {
    this.formErrors = {
      status: '',
      title: '',
      image: '',
      content: '',
      meta_title: '',
      meta_description: ''
    };
    this.formNotice.reset();
  }

  handleSetDelivery(event: any, index: number) {
    (this.formNotice.get('spaces') as FormArray).at(index).patchValue({
      delivery: event.value.type
    });
  }

  handleUpdateImage() {
    document.getElementById('input-file-main')?.click();
  }


  async onChangeImageMain(event: any) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.image);
      if (!check.status) {
        check.error;
      } else {
        const image : any= await this.uploadService.getBase64Default(file);
        this.formNotice.get('image')?.setValue(image.base64_default);
      }
      (<HTMLInputElement>document.getElementById('input-file-main')).value = '';
    }
  }

  ngOnDestroy() {
    if (this.subject_save) {
      this.subject_save.unsubscribe();
    }
    if (this.subject_success) {
      this.subject_success.unsubscribe();
    }
  }
}