import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, TypeHeaderPage, Utils } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { AdminService } from '../../admin.service';
import { environment as config } from 'src/environments/environment';
import { UploadFileService } from 'src/app/shared/services/helpers/upload-file.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/helpers/validation.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  pageInfo: any = {
    img: 'assets/images/icon-new.svg',
    title: '広告設定',
    is_seacrh: false,
    is_new: true,
    holder_search: 'タグを検索する',
    text_new: '新規登録'
  }
  subject_save: any = null;
  subject_success: any = null;
  data: any = [];
  currentDate: any = null;
  is_show_area: boolean = false;
  formBanner: FormGroup = new FormGroup({});
  formErrors = {
    url: '',
    image: ''
  };
  validationMessages = {
    url: {
      required: '必要',
      whitespace: '必要',
    },
    image: {
      required: '画像が必要です'
    }
  };
  panigation = {
    pageSize: 3,
    totalPage: 0,
    currentPage: 1,
    text: ''
  }
  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private timeService: TimeService,
    private router: Router,
    private uploadService: UploadFileService,
    private formBuilder: FormBuilder,
    private validatorService: ValidationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.currentDate = this.timeService.formatDateFromTimeUnix(new Date().getTime() / 1000, this.timeService.DATE_TIME_FORMAT_JAPAN);
    this.activatedRoute.queryParams.subscribe(res => {
      this.getData(res);
    });

    this.subject_save = this.componentActions.subject_save.subscribe((res: any) => {
      if (res.action == ACTION_TYPE.DELETE) {
        this.delete(res.id);
      }
      if (res.action == ACTION_TYPE.CREATE) {
        this.create();
      }
    });

    this.subject_success = this.componentActions.subject_success.subscribe((res: any) => {
      if (res.reget) {
        let params = {
          page: this.activatedRoute.snapshot.queryParamMap.get('page'),
          pagesize: this.activatedRoute.snapshot.queryParamMap.get('pagesize'),
          text: this.activatedRoute.snapshot.queryParamMap.get('text')
        }
        this.getData(params);
      }
    });
  }

  initForm() {
    this.formBanner = this.formBuilder.group({
      id: ['', []],
      url: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      image: ['', [Validators.required]],
    });
    this.formBanner.valueChanges.subscribe((data: object) => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    this.validatorService.getValidate(this.formBanner, this.formErrors, this.validationMessages);
  }


  getData(qparam: any) {
    this.componentActions.showLoading();
    this.panigation.currentPage = qparam && qparam.page ? Number(qparam.page) : 1;
    this.panigation.pageSize = qparam && qparam.pagesize ? Number(qparam.pagesize) : 3;
    this.panigation.text = qparam && qparam.text ? qparam.text : '';
    this.adminService.getListBanner(
      this.panigation.currentPage,
      this.panigation.pageSize,
      this.panigation.text
    ).subscribe(res => {
      if (res.docs.length == 0) {
        this.is_show_area = true;
      }
      this.componentActions.hideLoading();
      this.panigation.totalPage = res.total;
      this.data = this.conventData(res.docs);
    }, err => {
      this.componentActions.hideLoading();
    })
  }

  conventData(datas: any) {
    const no = 'ABCDEFGHJKLMNOP';
    let temp: any = [];
    datas.forEach((e: any, key: number) => {
      temp.push({
        pre: {
          image: e.image,
          url: e.url,
        },
        cap: `${no[key]}枠`,
        id: e._id,
        image: e.image,
        url: e.url,
        created_time: this.timeService.formatDateFromTimeUnix(e.created_at / 1000, this.timeService.DATE_TIME_FORMAT_JAPAN)
      });
    })
    return temp;
  }

  handleDelete(i:  number){
      this.componentActions.showPopup({
        message: `【${this.data[i].url}】\n削除しますか？`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.DELETE,
        id: this.data[i].id,
        text: 'はい'
      });
  }


  delete(id: any) {
    this.adminService.deleteBanner(id).subscribe(res => {
      this.componentActions.showPopup({
        message: '削除しました',
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

  handleSearch(event: any) {
    if (event.typeHeaderPage == TypeHeaderPage.LINK) {
      this.is_show_area = true;
    }
  }

  resetForm() {
    this.is_show_area = false;
    this.formErrors = {
      url: '',
      image: ''
    };
    this.formBanner.reset();
  }

  handleCreate() {
    if (this.formBanner.invalid) {
      this.formErrors = this.validatorService.checkErorrNotDiry(this.formBanner, this.formErrors, this.validationMessages);
    } else {
      this.componentActions.showPopup({
        message: `作成しますか？`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.CREATE,
        text: 'はい'
      });
    }
  }
  updateData(index: number) {
    this.formBanner.patchValue(this.data[index]);
    this.componentActions.showPopup({
      message: `アップデート？`,
      mode: CrudType.CONFIRM,
      action: ACTION_TYPE.CREATE,
      text: 'はい'
    });
  }

  create() {
    const body = {
      ...this.formBanner.value
    }
    if (body.id) {
      this.componentActions.showLoading();
      this.adminService.updateBanner(body, body.id).subscribe(res => {
        this.componentActions.showPopup({
          message: 'バナーを更新しました',
          mode: CrudType.SUCCESS,
          class: 'btn-blue',
          reget: true,
          text: 'OK'
        });
        this.componentActions.hideLoading();
      }, err => {
        this.componentActions.hideLoading();
        this.componentActions.showPopup({ title: Utils.TITLE_ERROR, message: err.errors.message, mode: CrudType.CLOSE });
      });
    } else {
      this.componentActions.showLoading();
      this.adminService.createBanner(body).subscribe(res => {
        this.componentActions.showPopup({
          message: '新規バナー登録',
          mode: CrudType.SUCCESS,
          class: 'btn-blue',
          reget: true,
          text: 'OK'
        });
        this.resetForm();
        this.componentActions.hideLoading();
      }, err => {
        this.componentActions.hideLoading();
        this.componentActions.showPopup({ title: Utils.TITLE_ERROR, message: err.errors.message, mode: CrudType.CLOSE });
      });
    }
  }

  handleUpdateImage() {
    document.getElementById('input-file-main-new')?.click();
  }


  async onChangeImageNew(event: any) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.image);
      if (!check.status) {
        check.error;
      } else {
        const image: any = await this.uploadService.getBase64Default(file);
        this.formBanner.get('image')?.setValue(image.base64_default);
      }
      (<HTMLInputElement>document.getElementById('input-file-main-new')).value = '';
    }
  }

  handleUpdateImageMain(index: number) {
    document.getElementById('input-file-main' + index)?.click();
  }

  async onChangeImageMain(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const check = this.uploadService.validate_file(file, this.uploadService.extension.image);
      if (!check.status) {
        check.error;
      } else {
        const image: any = await this.uploadService.getBase64Default(file);
        this.data[index].image = image.base64_default;
      }
      (<HTMLInputElement>document.getElementById('input-file-main' + index)).value = '';

    }
  }

  revertData(index: number) {
    this.data[index].url = this.data[index].pre.url;
    this.data[index].image = this.data[index].pre.image;
  }


  handlePage(page: any) {
    this.router.navigate([`/${config.routerLoginAdmin}/banner`],
      {
        queryParams: {
          page: page
        },
        queryParamsHandling: 'merge'
      }
    )
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
