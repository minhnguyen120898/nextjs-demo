import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, Utils } from 'src/app/shared/enums/utils';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  
  pageInfo: any = {
    img: 'assets/images/icon-list.svg',
    title: 'カテゴリー',
    is_seacrh: false,
    is_new: false,
    holder_search: 'タグを検索する',
    text_new: '新規登録'
  }
  subject_save: any = null;
  subject_close: any = null;
  formErrors = {
    name: '',
    user: ''
  };
  validationMessages = {
    name: {
      required: '作成者を選択してください',
      whitespace: '作成者を選択してください',
    },
    user: {
      required: '作成者を選択してください',
      whitespace: '作成者を選択してください',
    }
  };
  formCategory: FormGroup = new FormGroup({});
  id: any = null;

  users = {
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
  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
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
      if (res.action == ACTION_TYPE.CREATE) {
        this.create();
      }
      if (res.action == ACTION_TYPE.DELETE) {
        this.delete(res.id);
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
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/category`)
  }

  create() {
    const body = {
      ...this.formCategory.value
    }
    if (this.id) {
      this.componentActions.showLoading();
      this.adminService.updateCategory(body, this.id).subscribe(res => {
        this.componentActions.showPopup({
          message: 'カテゴリーの更新をしました',
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
      this.adminService.createCategory(body).subscribe(res => {
        this.componentActions.showPopup({
          message: 'カテゴリーの新規登録をしました',
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
    this.formCategory = this.formBuilder.group({
      user: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      name: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
    });
    this.formCategory.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formCategory, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formCategory.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formCategory, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `カテゴリーの新規登録をしました`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.CREATE,
        text: 'はい'
      });
    }
  }

  
  handleDelete(){
    this.componentActions.showPopup({
      message: `【${1}】\nこのカテゴリーを削除してもよろしいですか？`,
      mode: CrudType.CONFIRM,
      action: ACTION_TYPE.DELETE,
      id: this.id,
      text: 'はい'
    });
  }

  delete(id: any) {
    this.adminService.deleteCategory(id).subscribe(res => {
      this.componentActions.showPopup({
        message: 'カテゴリーを削除しました',
        mode: CrudType.CLOSE,
        class: 'btn-blue',
        reget: true,
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


  handleReset() {

  }

  handleSetEmloyment(event: any) {
    this.formCategory.get('user')?.setValue(event.value.type);
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