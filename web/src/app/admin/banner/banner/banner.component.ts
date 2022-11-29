import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { AdminService } from '../../admin.service';
import { environment as config } from 'src/environments/environment';
import { UploadFileService } from 'src/app/shared/services/helpers/upload-file.service';

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
    is_new: false,
    holder_search: 'タグを検索する',
    text_new: '新規登録'
  }
  subject_save: any = null;
  subject_close: any = null;
  data: any = [];
  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private timeService: TimeService,
    private router: Router,
    private uploadService: UploadFileService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      console.log(res);
      
      this.getData()
    });

    this.subject_save = this.componentActions.subject_save.subscribe((res: any) => {
      if (res && res.join && res.data) {
        if (res.action == ACTION_TYPE.DELETE) {
          this.delete(res.id);
        }
      }
    });

    this.subject_close = this.componentActions.subject_close.subscribe((res: any) => {
      if (res.back) {
        this.getData();
      }
    });
  }

  getData() {
    this.componentActions.showLoading();
    this.adminService.getListAd(
    ).subscribe(res => {
      this.componentActions.hideLoading();
      this.data = this.conventData([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    }, err => {
      this.data = this.conventData([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
      this.componentActions.hideLoading();
    })
  }
  conventData(datas: any) {
    let temp: any = [];
    datas.forEach((e: any, key: number) => {
      let obj: any = {
        id: 1,
        item: {
          title: 'text'
        },
        content: [

        ],
        action: null
      }

      obj.content = [
        {
          title: key + 1 + '.'
        },
        {
          title: '2022/10/25',
        },
        { title: 'グルメ' },
        { title: '削除', action: ACTION_TYPE.DELETE },
        { title: '編集', action: ACTION_TYPE.DETAIL }
      ];

      temp.push(obj);
    })
    return temp;
  }


  delete(id: any) {
    this.adminService.deleteTag(id).subscribe(res => {
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


  ngOnDestroy() {
    if (this.subject_save) {
      this.subject_save.unsubscribe();
    }
    if (this.subject_close) {
      this.subject_close.unsubscribe();
    }
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
}
