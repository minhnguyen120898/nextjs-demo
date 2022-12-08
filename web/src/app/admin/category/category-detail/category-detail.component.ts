import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, Utils } from 'src/app/shared/enums/utils';
import { UploadFileService } from 'src/app/shared/services/helpers/upload-file.service';
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
  subject_success: any = null;

  formErrors = {
    title: '',
    parent: '',
    image: ''
  };
  validationMessages = {
    title: {
      required: 'タイトルが必要です',
      whitespace: 'タイトルが必要です',
    },
    parent: {
      required: '',
      whitespace: '',
    },
    image: {
      required: '画像が必要です'
    }
  };
  formCategory: FormGroup = new FormGroup({});
  id: any = null;

  categorys_parent: any = {
    list: [],
    name_select: '- 選択してください'
  }


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

    await new Promise((resolve: any, reject: any) => {
      this.adminService.getListCategory(1, 100, '').subscribe(res => {
        res.docs = res.docs.map((e: any) => {
          return {
            itemName: e.title,
            id: e._id,
            parent: e.parent
          }
        }).filter((e: any) => {
          return e.parent.length == 0;
        });
        resolve(res.docs);
      }, err => {
        resolve([]);
      });
    }).then(docs => {
      this.categorys_parent.list = docs;
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
    this.adminService.getDetailCategory(this.id).subscribe(res => {
      this.formCategory.patchValue({
        title: res.title,
        image: res.image,
        parent: res.parent
      });

      if(res.parent&&res.parent[0]){
        this.categorys_parent.name_select =  this.categorys_parent.list.find((e: any)=>{
          return e.id == res.parent[0];
        })?.itemName
      }
      this.componentActions.hideLoading();
    }, err => {
      this.componentActions.hideLoading();
    })
  }

  back() {
    this.router.navigateByUrl(`/${config.routerLoginAdmin}/category`)
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
        const image: any = await this.uploadService.getBase64Default(file);
        this.formCategory.get('image')?.setValue(image.base64_default)
      }
    }
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
          mode: CrudType.SUCCESS,
          class: 'btn-blue',
          back: true,
          text: 'OK'
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
          mode: CrudType.SUCCESS,
          class: 'btn-blue',
          back: true,
          text: 'OK'
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
      parent: [[], []],
      title: ['', [Validators.required, this.validatorService.noWhitespaceValidator]],
      image: ['', [Validators.required]],
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

  handleDelete() {
    this.componentActions.showPopup({
      message: `【${this.formCategory.value.title}】\nこのカテゴリーを削除してもよろしいですか？`,
      mode: CrudType.CONFIRM,
      action: ACTION_TYPE.DELETE,
      id: this.id,
      text: 'はい'
    });
  }

  delete(id: any) {
    this.componentActions.showLoading();
    this.adminService.deleteCategory(id).subscribe(res => {
      this.componentActions.showPopup({
        message: 'カテゴリーを削除しました',
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

  handleReset() {
    this.formErrors = {
      title: '',
      parent: '',
      image: ''
    };
    this.formCategory.reset();
    if (this.id) {
      this.getData();
    }
  }

  handleParentCategory(event: any) {
    this.formCategory.get('parent')?.setValue([
      event.value.id
    ]);
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