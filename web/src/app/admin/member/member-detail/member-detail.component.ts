import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { Utils } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  pageInfo: any = {
    img: 'assets/images/icon-plan.svg',
    title: 'プランを検索する',
    is_seacrh: false,
    is_new: false,
    holder_search: '検索する',
    text_new: 'CSVダウンロード'
  }
  subject_save: any = null;
  subject_close: any = null;
  status = {
    list: [
      {
        itemName: '山田　太郎',
        type: '正社員'
      },
      {
        itemName: '田中　かずき',
        type: '派遣社員'
      },
      {
        itemName: '山下　花子',
        type: 'アルバイト'
      }
    ],
    name_select: '- 選択してください'
  }
  formErrors = {
    status: '',
    registration_date: '',
    first_name: '',
    last_name: '',
    first_name_kata: '',
    last_name_kata: '',
    gender: '',
    prefectures: '',
    email: ''
  };
  validationMessages = {
    status: {
      required: '作成者を選択してください',
    },
    registration_date: {
      required: 'タイトルは必須です',
    },
    first_name: {
      required: '名前(姓)が入力されていません。',
    }, last_name: {
      required: '名前(名)が入力されていません。',

    }, first_name_kata: {
      required: '名前(フリガナ・姓)が入力されていません。',
      pattern: '名前(フリガナ・姓)が入力されていません。',

    }, last_name_kata: {
      required: '名前(フリガナ・名)が入力されていません。',
      pattern: '名前(フリガナ・名)が入力されていません。',
    }, gender: {
      required: '性別を入力してください'
    },
    prefectures: {
      required: '都道府県必須',
    },
    email: {
      required: 'メールアドレスが入力されていません。',
      pattern: 'メールアドレス(確認)が入力されていません。'
    },
  };
  formMember: FormGroup = new FormGroup({});
  id: any = null;
  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private timeService: TimeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private validatorService: ValidationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getData();
    }
    this.subject_save = this.componentActions.subject_save.subscribe((res: any) => {
      if (res.create) {
        this.create();
      }
    });

    this.subject_close = this.componentActions.subject_close.subscribe((res: any) => {
      if (res.back) {
        this.back()
      }
    });
  }

  getData() {

  }

  back() {
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/plan`)
  }

  create() {
    const body = {
      ...this.formMember.value
    }
    if (body.image) {
      if (!body.image.islink) {
        body.avatar = body.image.base64_default;
      }
      delete body.image;
    };
    if (this.id) {
      this.componentActions.showLoading();
      this.adminService.updatePlan(body, this.id).subscribe(res => {
        this.componentActions.showPopup({
          message: '保存しました',
          mode: CrudType.CLOSE,
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
      this.adminService.createPlan(body).subscribe(res => {
        this.componentActions.showPopup({
          message: '保存しました',
          mode: CrudType.CLOSE,
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
    this.formMember = this.formBuilder.group({
      status: ['', [Validators.required]],
      registration_date: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      first_name: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      last_name: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      first_name_kata: ['', [Validators.required, Validators.pattern(this.validatorService.only_japan_language_hiragana_katacana)]],
      last_name_kata: ['', [Validators.required, Validators.pattern(this.validatorService.only_japan_language_hiragana_katacana)]],
      gender: ['', [Validators.required]],
      prefectures: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.pattern_email)]],
      term: ['']
    });
    this.formMember.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formMember, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formMember.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formMember, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `【${this.formMember.value.title}】\n
        このプランで保存しますか？`,
        mode: CrudType.CONFIRM,
        create: true,
        text: 'はい'
      });
    }
  }

  handleSetEmloyment(event: any) {
    this.formMember.get('user')?.setValue(event.value.type);
  }

  handleReset() {
    this.formErrors = {
      status: '',
      registration_date: '',
      first_name: '',
      last_name: '',
      first_name_kata: '',
      last_name_kata: '',
      gender: '',
      prefectures: '',
      email: ''
    };
    this.formMember.reset();
  }
  ngOnDestroy() {
    if (this.subject_save) {
      this.subject_save.unsubscribe();
    }
    if (this.subject_close) {
      this.subject_close.unsubscribe();
    }
  }
}