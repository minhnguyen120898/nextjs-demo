import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, Utils, WORK_STATUS } from 'src/app/shared/enums/utils';
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
  };

  name_file_upload = '';
  date = {
    time_start: new Date(''),
    time_end: new Date(''),
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
  subject_success: any = null;

  status = {
    list: [
      {
        itemName: '公衆',
        type: WORK_STATUS.PUBLIC
      },
      {
        itemName: 'プライベート',
        type: WORK_STATUS.PRIVATE
      }
    ],
    name_select: '- 選択してください'
  }

  category: any = {
    list: [],
    name_select: '- 選択してください'
  }

  tag: any = {
    list: [],
    name_select: '- 選択してください'
  }

  formErrors = {
    status: '',
    title: '',
    eye_catching: '',
    description: '',
    category: '',
    tag: '',
    video_link: '',
    video_up: '',
    meta_title: '',
    meta_description: '',
    content_id: '',
    spot_name: '',
    explanatory_text: '',
    url: '',
    zip_code: '',
    address: '',
    phone: '',
    utilization_time: '',
    holiday: '',
    fee: '',
    parking: '',
    remark: '',
    stay_time: '',
    lng: '',
    lat: '',
    category1: '',
    image: '',
    time_start: '',
    time_end: '',
    is_featured: '',
  };
  validationMessages = {
    status: {
      required: 'ステータスの選択をしてください',
      whitespace: 'ステータスの選択をしてください',
    },
    title: {
      required: 'タイトルを入力してください',
      whitespace: 'タイトルを入力してください',
    },
    eye_catching: {
      required: '画像をアップデートしてください',
    },
    description: {
      required: '本文を入力してください',
      whitespace: '本文を入力してください',
    },
    category: {
      required: 'カテゴリーを選択してください',
    },
    tag: {
      required: 'タグを選択してください',
    },
    video_link: {
      required: '動画リンクを入力してください',
    },
    video_up: {
      required: '動画の容量は2GB以下の必要があります',
    },
    meta_title: {
      required: 'タイトル必須',
      whitespace: 'タイトル必須',
    },
    meta_description: {
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
    zip_code: {
      required: '修理が必要',
    },
    address: {
      required: '修理が必要',
    },
    phone: {
      pattern: '電話無効',
    },
    utilization_time: {
      required: '修理が必要',
    },
    holiday: {
      required: '修理が必要',
    },
    fee: {
      required: '修理が必要',
    },
    parking: {
      required: '修理が必要',
    },
    remark: {
      required: '修理が必要',
    },
    stay_time: {
      required: '修理が必要',
    },
    lng: {
      required: '修理が必要',
    },
    lat: {
      required: '修理が必要',
    },
    category1: {
      required: '修理が必要',
    },
    image: {
      required: '修理が必要',
    },
    time_start: {
      required: '修理が必要',
    },
    time_end: {
      required: '修理が必要',
    }
  };
  formWork: FormGroup = new FormGroup({});
  id: any = null;
  imageList: any[] = [{ id: UUID.UUID(), image: null }];

  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    private validatorService: ValidationService,
    private uploadService: UploadFileService
  ) { }

  async ngOnInit() {
    this.initForm();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    await Promise.all([this.adminService.getDataPromise('category?page=1&limit=1000', true),
    this.adminService.getDataPromise('tag?page=1&limit=1000', false)
    ]).then(res => {
      this.category.list = res[0];
      this.tag.list = res[1];
    });

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
    this.adminService.getDetailWork(this.id).subscribe(res => {
      this.formWork.patchValue({
        status: res.status,
        title: res.title,
        eye_catching: res.eye_catching,
        description: res.description,
        category: res.category.map((e: any) => {
          return e._id
        }),
        tag: res.tag.map((e: any) => {
          return e._id
        }),
        video_link: res.video,
        video_up: null,
        meta_title: res.meta_title,
        meta_description: res.meta_description,
        content_id: res.content_id,
        spot_name: res.spot_name,
        explanatory_text: res.explanatory_text,
        url: res.url,
        zip_code: res.zip_code,
        address: res.address,
        phone: res.phone,
        utilization_time: res.utilization_time,
        holiday: res.holiday,
        fee: res.fee,
        parking: res.parking,
        remark: res.remark,
        stay_time: res.stay_time,
        lng: res.lng,
        lat: res.lat,
        category1: res.category1,
        image: res.image,
        time_start: res.time_start,
        time_end: res.time_end,
        is_featured: res.is_featured,
        facebook: res.social?.facebook,
        instagram: res.social?.instagram,
        twitter: res.social?.twitter
      });
      // CATEGORY 
      this.category.name_select = res.category.map((e: any) => { return e.title }).join(' ,');
      const categoryName = res.category.map((e: any) => { return e.title }) as any[];
      this.category.list.forEach((e: any) => {
        if (categoryName.includes(e.itemName)) {
          e.checked = true;
        }
      });
      // TAG 
      this.tag.name_select = res.tag.map((e: any) => { return e.title }).join(' ,');
      const tagName = res.category.map((e: any) => { return e.title }) as any[];
      this.tag.list.forEach((e: any) => {
        if (tagName.includes(e.itemName)) {
          e.checked = true;
        }
      });
      // STATUS
      this.status.name_select = this.status.list.find(e => { return e.type == res.status })?.itemName || '';
      // IMAGE
      this.imageList = res.image.map((e: any, key: number) => {
        return {
          id: UUID.UUID(),
          image: e,
          is_delete: key ? true : false
        }
      });

      // TIME
      if(res.time_start){
        this.date.time_start = new Date(new Date(Number(res.time_start)).getFullYear(),
        new Date(Number(res.time_start)).getMonth(),
        new Date(Number(res.time_start)).getDate());
      }
      
      if(res.time_end){
        this.date.time_end = new Date(new Date(Number(res.time_end)).getFullYear(),
        new Date(Number(res.time_end)).getMonth(),
        new Date(Number(res.time_end)).getDate())
      }
     

      this.componentActions.hideLoading();
    }, err => {
      this.componentActions.hideLoading();
    })
  }

  back() {
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/work`)
  }

  create() {
    const formValue = this.formWork.value;
    const body = {
      status: formValue.status,
      title: formValue.title,
      eye_catching: formValue.eye_catching,
      description: formValue.description,
      category: formValue.category,
      tag: formValue.tag,
      video: formValue.video_up ? formValue.video_up : formValue.video_link,
      meta_title: formValue.meta_title,
      meta_description: formValue.meta_description,
      content_id: formValue.content_id,
      spot_name: formValue.spot_name,
      explanatory_text: formValue.explanatory_text,
      url: formValue.url,
      zip_code: formValue.zip_code,
      address: formValue.address,
      phone: formValue.phone,
      utilization_time: formValue.utilization_time,
      holiday: formValue.holiday,
      fee: formValue.fee,
      parking: formValue.parking,
      remark: formValue.remark,
      stay_time: formValue.stay_time,
      lng: formValue.lng,
      lat: formValue.lat,
      category1: formValue.category1,
      image: this.imageList.map(e => {
        return e.image
      }),
      time_start: formValue.time_start,
      time_end: formValue.time_end,
      is_featured: formValue.is_featured,
      social: {
        facebook: formValue.facebook,
        instagram: formValue.instagram,
        twitter: formValue.twitter
      }
    };

    if (this.id) {
      this.componentActions.showLoading();
      this.adminService.updateWork(body, this.id).subscribe(res => {
        this.componentActions.showPopup({
          message: '施設の更新をしました',
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
      this.adminService.createWork(body).subscribe(res => {
        this.componentActions.showPopup({
          message: '施設の新規登録をしました',
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
    this.formWork = this.formBuilder.group({
      status: ['', [Validators.required]],
      title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      eye_catching: ['', [Validators.required]],
      description: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      category: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      video_link: [''],
      video_up: [''],
      meta_title: ['', []],
      meta_description: ['', []],
      content_id: [''],
      spot_name: [''],
      explanatory_text: [''],
      url: [''],
      zip_code: [''],
      address: [''],
      phone: ['', [Validators.pattern(this.validatorService.only_number)]],
      utilization_time: [''],
      holiday: [''],
      fee: [''],
      parking: [''],
      remark: [''],
      stay_time: [''],
      lng: [''],
      lat: [''],
      category1: [''],
      image: [[], []],
      time_start: [''],
      time_end: [''],
      is_featured: [''],
      facebook: [''],
      twitter: [''],
      instagram: ['']
    });
    this.formWork.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formWork, this.formErrors, this.validationMessages);
  }

  handleCreate() {
    if (this.formWork.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formWork, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `【${this.formWork.value.title}】\n
        このプランで保存しますか？`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.CREATE,
        text: 'はい'
      });
    }
  }

  handleDelete() {
    this.componentActions.showPopup({
      message: `【${this.formWork.value.title}】\n削除しますか？`,
      mode: CrudType.CONFIRM,
      action: ACTION_TYPE.DELETE,
      id: this.id,
      text: 'はい'
    });
  }

  delete(id: any) {
    this.componentActions.showLoading();
    this.adminService.deleteWork(id).subscribe(res => {
      this.componentActions.showPopup({
        message: '削除しました',
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

  handleSetCategory(event: any[]) {
    let arr = event.map(e => { return JSON.parse(e) });
    this.category.name_select = arr.map(e => { return e.itemName }).join(' ,');
    let ids = arr.map(e => { return e.id });
    this.formWork.get('category')?.setValue(ids);
  }

  handleSetTag(event: any[]) {
    let arr = event.map(e => { return JSON.parse(e) });
    this.tag.name_select = arr.map(e => { return e.itemName }).join(' ,');
    let ids = arr.map(e => { return e.id });
    this.formWork.get('tag')?.setValue(ids);
  }

  handleSetStatus(event: any) {
    this.status.name_select = event.value.itemName;
    this.formWork.get('status')?.setValue(Number(event.value.type));
  }

  handleReset() {
    this.formErrors = {
      status: '',
      title: '',
      eye_catching: '',
      description: '',
      category: '',
      tag: '',
      video_link: '',
      video_up: '',
      meta_title: '',
      meta_description: '',
      content_id: '',
      spot_name: '',
      explanatory_text: '',
      url: '',
      zip_code: '',
      address: '',
      phone: '',
      utilization_time: '',
      holiday: '',
      fee: '',
      parking: '',
      remark: '',
      stay_time: '',
      lng: '',
      lat: '',
      category1: '',
      image: '',
      time_start: '',
      time_end: '',
      is_featured: ''
    };
    this.formWork.reset();
    this.imageList = [{ id: UUID.UUID(), image: null, is_delete: false }];
  }

  handleSetDelivery(event: any, index: number) {
    (this.formWork.get('spaces') as FormArray).at(index).patchValue({
      delivery: event.value.type
    });
  }

  handleUpdateImage() {
    document.getElementById('input-file-image-main')?.click();
  }

  async onChangeImageMain(event: any) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.image);
      if (!check.status) {
        check.error;
      } else {
        const image: any = await this.uploadService.getBase64Default(file);
        this.formWork.get('eye_catching')?.setValue(image.base64_default)
      }
      (<HTMLInputElement>document.getElementById('input-file-image-main')).value = '';
    }
  }

  handleUpdateVideo() {
    document.getElementById('input-file-main-video')?.click();
  }

  async onChangeVideo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.video, 2048);
      this.name_file_upload = check.fileName;
      if (!check.status) {
        check.error;
      } else {
        const video: any = await this.uploadService.getBase64Default(file);
        this.formWork.get('video_up')?.setValue(video.base64_default);
      }
      (<HTMLInputElement>document.getElementById('input-file-main-video')).value = '';

    }
  }

  getTime(event: any, type: string) {
    this.formWork.get(type)?.setValue(new Date(event).getTime());
  }

  addImage() {
    this.imageList.push({ id: UUID.UUID(), image: null, is_delete: true });
  }

  onDeleteSubImg(item: any, index: number) {
    this.imageList.splice(index, 1)
  }

  async onChangeImageSecond(event: any, i: number) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.image);
      if (!check.status) {
        this.formErrors.image = check.error;
      } else {
        const image: any = await this.uploadService.getBase64Default(file);
        this.imageList[i].image = image.base64_default;
      }
    }
  }

  handleAutofill() {
    let zip_code = this.formWork.value.zip_code;
    if (!zip_code) return false;
    this.componentActions.showLoading();
    this.adminService.getAddressFromZipcode(zip_code).subscribe({
      next: (res) => {
        if (res.location) {
          let address = res.location.split(',');
          this.formWork.patchValue({ address: address.toString() });
        }
        this.componentActions.hideLoading();
      },
      error: (err) => {
        this.componentActions.hideLoading();
      },
    });
    return;
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