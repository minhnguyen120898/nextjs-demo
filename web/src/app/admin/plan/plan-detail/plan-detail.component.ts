import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { TypeHeaderPage, Utils } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {

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
  delivery = {
    list: [
      {
        itemName: '車',
        type: '正社員'
      },
      {
        itemName: '電車',
        type: '派遣社員'
      },
      {
        itemName: '徒歩',
        type: 'アルバイト'
      }
    ],
    name_select: '- 選択してください'
  }
  formErrors = {
    user: '',
    title: '',
    first_name: '',
    spaces: ''
  };
  validationMessages = {
    user: {
      required: '作成者を選択してください',
      whitespace: '作成者を選択してください',
    },
    title: {
      required: 'タイトルは必須です',
      whitespace: 'タイトルは必須です',
    }
  };
  formPlan: FormGroup = new FormGroup({});
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
      ...this.formPlan.value
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
    this.formPlan = this.formBuilder.group({
      user: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      spaces: this.formBuilder.array([
        this.formBuilder.group({
          time: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
          delivery: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
          id: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
        })
      ]),
    });
    this.formPlan.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formPlan, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formPlan.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formPlan, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `【${this.formPlan.value.title}】\n
        このプランで保存しますか？`,
        mode: CrudType.CONFIRM,
        create: true,
        text: 'はい'
      });
    }
  }

  handleSetEmloyment(event: any) {
    this.formPlan.get('user')?.setValue(event.value.type);
  }

  handleReset() {

  }

  handleSetDelivery(event: any, index: number) {
    (this.formPlan.get('spaces') as FormArray).at(index).patchValue({
      delivery: event.value.type
    });
  }

  getControlArray() {
    return (this.formPlan.get('spaces') as FormArray).controls;
  }

  get getFormArray(): FormArray {
    return this.formPlan.get('spaces') as FormArray
  }

  addItemForm() {
    (this.formPlan.get('spaces') as FormArray).push(
      this.formBuilder.group(
        {
          age: ['', [Validators.required]]
        }
      )
    )
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