import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, Utils } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {

  pageInfo: any = {
    img: 'assets/images/icon-tag.svg',
    title: 'タグ',
    is_seacrh: false,
    is_new: false,
    holder_search: 'タグを検索する',
    text_new: '新規登録'
  }
  subject_save: any = null;
  subject_success: any = null;
  formErrors = {
    title: ''
  };
  validationMessages = {
    title: {
      required: '作成者を選択してください',
      whitespace: '作成者を選択してください',
    }
  };
  formTag: FormGroup = new FormGroup({});
  id: any = null;
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

    this.subject_success = this.componentActions.subject_success.subscribe((res: any) => {
      if (res.back) {
        this.back()
      }
    });
  }

  getData() {
    this.componentActions.showLoading();
    this.adminService.getDetailTag(this.id).subscribe(res=>{
      console.log(res);
      this.formTag.patchValue({
        title: res.title
      });
      this.componentActions.hideLoading();
    },err=>{
      this.componentActions.hideLoading();
    })
  }

  back() {
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/tag`)
  }

  create() {
    const body = {
      ...this.formTag.value
    }
    if (this.id) {
      this.componentActions.showLoading();
      this.adminService.updateTag(body, this.id).subscribe(res => {
        this.componentActions.showPopup({
          message: 'タグの更新をしました',
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
      this.adminService.createTag(body).subscribe(res => {
        this.componentActions.showPopup({
          message: 'タグの新規登録をしました',
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
    this.formTag = this.formBuilder.group({
      title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
    });
    this.formTag.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formTag, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formTag.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formTag, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `タグの新規登録をしました`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.CREATE,
        text: 'はい'
      });
    }
  }

  
  handleDelete(){
    this.componentActions.showPopup({
      message: `【${this.formTag.value.title}】\nこのタグを削除してもよろしいですか？`,
      mode: CrudType.CONFIRM,
      action: ACTION_TYPE.DELETE,
      id: this.id,
      text: 'はい'
    });
  }

  delete(id: any) {
    this.componentActions.showLoading();
    this.adminService.deleteTag(id).subscribe(res => {
      this.componentActions.showPopup({
        message: 'タグを削除しました',
        mode: CrudType.SUCCESS,
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
    this.formErrors = {
      title: '',
    };
    this.formTag.reset();
    if(this.id){
      this.getData();
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