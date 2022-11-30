import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { Utils } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { UploadFileService } from 'src/app/shared/services/helpers/upload-file.service';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.scss']
})
export class BuildingCreateComponent implements OnInit {
  placeholder = {
    start_at: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
    end_at: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
    time_start_at: `${new Date().getHours()}: ${new Date().getMinutes()}`,
    time_end_at: `${new Date().getHours()}: ${new Date().getMinutes()}`,
  };
  date = {
    start_at: new Date(''),
    end_at: new Date(''),
  }
  pageInfo: any = {
    img: 'assets/images/icon-building.svg',
    title: '施設一覧',
    is_seacrh: false,
    is_new: false,
    holder_search: '施設を検索する',
    text_new: '新規登録'
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

  category = {
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
    title: '',
    image: '',
    text: '',
    category: '',
    tag: '',
    video_link: '',
    video_up: '',
    seo_title: '',
    meta_decription: '',
    content_id: '',
    spot_name: '',
    explanatory_text: '',
    url: '',
    address: '',
    street_and_apartement: '',
    phone_number: '',
    utilization_time: '',
    holiday: '',
    usage_fee: '',
    parking: '',
    remake: '',
    stay_time: '',
    longitude: '',
    latitude: '',
    category_2: '',
    image_2: '',
    start_at: '',
    end_at: ''
  };
  validationMessages = {
    status: {
      required: 'タイトルを入力してください',
      whitespace: '作成者を選択してください',
    },
    title: {
      required: 'タイトルを入力してください',
      whitespace: 'タイトルを入力してください',
    },
    image: {
      required: '画像が必要です',
    },
    text: {
      required: '本文を入力してください',
      whitespace: '本文を入力してください',
    },
    category: {
      required: '本文を入力してください',
    },
    tag: {
      required: '本文を入力してください',
    },
    video_link: {
      required: '本文を入力してください',
    },
    video_up: {
      required: '本文を入力してください',
    },
    seo_title: {
      required: 'タイトル必須',
      whitespace: 'タイトル必須',
    },
    meta_decription: {
      required: '修理が必要',
      whitespace: '修理が必要',
    },
    content_id: {
      required: '修理が必要',
    },
    spot_name: {
      required: '修理が必要',
    },
    explanatory_text: {
      required: '修理が必要',
    },
    url: {
      required: '修理が必要',
    },
    address: {
      required: '修理が必要',
    },
    street_and_apartement: {
      required: '修理が必要',
    },
    phone_number: {
      required: '修理が必要',
    },
    utilization_time: {
      required: '修理が必要',
    },
    holiday: {
      required: '修理が必要',
    },
    usage_fee: {
      required: '修理が必要',
    },
    parking: {
      required: '修理が必要',
    },
    remake: {
      required: '修理が必要',
    },
    stay_time: {
      required: '修理が必要',
    },
    longitude: {
      required: '修理が必要',
    },
    latitude: {
      required: '修理が必要',
    },
    category_2: {
      required: '修理が必要',
    },
    image_2: {
      required: '修理が必要',
    },
    start_at: {
      required: '修理が必要',
    },
    end_at: {
      required: '修理が必要',
    }
  };
  formBuilding: FormGroup = new FormGroup({});
  id: any = null;
  images: any[] = [1];
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
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/building`)
  }

  create() {
    const body = {
      ...this.formBuilding.value
    }
    if (body.image) {
      if (!body.image.islink) {
        body.avatar = body.image.base64_default;
      }
      delete body.image;
    };
    if (this.id) {
      this.componentActions.showLoading();
      this.adminService.updateBuilding(body, this.id).subscribe(res => {
        this.componentActions.showPopup({
          message: 'お知らせを投稿しました',
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
      this.adminService.createBuilding(body).subscribe(res => {
        this.componentActions.showPopup({
          message: 'お知らせを投稿しました',
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
    this.formBuilding = this.formBuilder.group({
      status: ['', [Validators.required]],
      title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      image: ['', [Validators.required]],
      text: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      category: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      video_link: [''],
      video_up: [''],
      seo_title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      meta_decription: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      content_id: [''],
      spot_name: [''],
      explanatory_text: [''],
      url: [''],
      address: [''],
      street_and_apartement: [''],
      phone_number: [''],
      utilization_time: [''],
      holiday: [''],
      usage_fee: [''],
      parking: [''],
      remake: [''],
      stay_time: [''],
      longitude: [''],
      latitude: [''],
      category_2: [''],
      image_2: [''],
      start_at: [''],
      end_at: ['']
    });
    this.formBuilding.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formBuilding, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formBuilding.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formBuilding, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `【${this.formBuilding.value.title}】\n
        このプランで保存しますか？`,
        mode: CrudType.CONFIRM,
        create: true,
        text: 'はい'
      });
    }
  }

  handleSetEmloyment(event: any) {
    this.formBuilding.get('user')?.setValue(event.value.type);
  }

  handleSetCategory(event: any) {
    this.formBuilding.get('category')?.setValue(event.value.type);
  }


  handleReset() {
    this.formErrors = {
      status: '',
    title: '',
    image: '',
    text: '',
    category: '',
    tag: '',
    video_link: '',
    video_up: '',
    seo_title: '',
    meta_decription: '',
    content_id: '',
    spot_name: '',
    explanatory_text: '',
    url: '',
    address: '',
    street_and_apartement: '',
    phone_number: '',
    utilization_time: '',
    holiday: '',
    usage_fee: '',
    parking: '',
    remake: '',
    stay_time: '',
    longitude: '',
    latitude: '',
    category_2: '',
    image_2: '',
    start_at: '',
    end_at: ''
    };
    this.formBuilding.reset();
  }

  handleSetDelivery(event: any, index: number) {
    (this.formBuilding.get('spaces') as FormArray).at(index).patchValue({
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
        const image = await this.uploadService.getBase64Default(file);
        // this.formStaff.get('image')?.setValue(image)
      }
    }
  }

  handleUpdateImage2() {
    document.getElementById('input-file-main')?.click();
  }


  async onChangeImageMain2(event: any) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.image);
      if (!check.status) {
        check.error;
      } else {
        const image = await this.uploadService.getBase64Default(file);
        // this.formStaff.get('image')?.setValue(image)
      }
    }
  }

  getTime(event: any, type: string) {

  }

  addImage() {
    this.images.push(1);
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