import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, TypeHeaderPage } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  pageInfo: any = {
    img: 'assets/images/icon-list.svg',
    title: 'カテゴリー',
    is_seacrh: true,
    is_new: true,
    holder_search: 'タグを検索する',
    text_new: '新規登録'
  }
  headers = [
    'NO.',
    '作成日',
    'カテゴリー',
    '親カテゴリー',
    'アイキャッチ',
    '',
    ''
  ];
  panigation = {
    pageSize: 10,
    totalPage: 0,
    currentPage: 1,
    text: ''
  }
  subject_save: any = null;
  subject_success: any = null;
  data: any = [];
  constructor(private componentActions: ComponentActions,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private timeService: TimeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.getData(res)
    });

    this.subject_save = this.componentActions.subject_save.subscribe((res: any) => {
      if (res.action == ACTION_TYPE.DELETE) {
        this.delete(res.id);
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

  getData(qparam: any) {
    this.componentActions.showLoading();
    this.panigation.currentPage = qparam && qparam.page ? Number(qparam.page) : 1;
    this.panigation.pageSize = qparam && qparam.pagesize ? Number(qparam.pagesize) : 10;
    this.panigation.text = qparam && qparam.text ? qparam.text : '';
    this.adminService.getListCategory(
      this.panigation.currentPage,
      this.panigation.pageSize,
      this.panigation.text
    ).subscribe(res => {
      this.componentActions.hideLoading();
      this.panigation.totalPage = res.total;
      this.data = this.conventData(res.docs);
    }, err => {
      this.componentActions.hideLoading();
    })
  }
  conventData(datas: any) {
    let temp: any = [];
    datas.forEach((e: any, key: number) => {
      let obj: any = {
        id: e._id,
        item: e,
        content: [

        ],
        action: null
      }

      obj.content = [
        {
          title: key + 1 + '.'
        },
        {
          title: this.timeService.formatDateFromTimeUnix(e.created_at / 1000, this.timeService.DATE_TIME_FORMAT_JAPAN),
        },
        { title: e.title },
        { title: e.parent && e.parent[0] ? e.parent[0].title : '' },
        {
          img: e.image,
          style: {
            width: '3.5rem',
            height: '3.5rem',
            'border-radius': '5px',
            'object-fit': 'cover'
          }
        },
        {
          title: '削除', action: ACTION_TYPE.DELETE,
          style: {
            cursor: 'pointer'
          }
        },
        {
          title: '編集', action: ACTION_TYPE.DETAIL,
          style: {
            color: '#979797',
            cursor: 'pointer'
          }
        },
      ];

      temp.push(obj);
    })
    return temp;
  }

  handleAction(event: any) {
    if (event.action == 'pagesize') {
      this.router.navigate([`/${config.routerLoginAdmin}/category`],
        {
          queryParams: {
            page: this.panigation.currentPage,
            pagesize: event.value
          },
          queryParamsHandling: 'merge'
        }
      )
    }
    if (event.action == ACTION_TYPE.DETAIL) {
      this.router.navigateByUrl(`/${config.routerLoginAdmin}/category/update/${event.id}`)
    }
    if (event.action == ACTION_TYPE.DELETE) {
      this.componentActions.showPopup({
        message: `【${event.item.title}】\nこのカテゴリーを削除してもよろしいですか？`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.DELETE,
        id: event.id,
        text: 'はい'
      });
    }
  }


  handlePage(page: any) {
    this.router.navigate([`/${config.routerLoginAdmin}/category`],
      {
        queryParams: {
          page: page
        },
        queryParamsHandling: 'merge'
      }
    )
  }

  handleSearch(event: any) {
    if (event.typeHeaderPage == TypeHeaderPage.SEARCH) {
      this.router.navigate([`/${config.routerLoginAdmin}/category`],
        {
          queryParams: {
            page: 1,
            text: event.text
          },
          queryParamsHandling: 'merge'
        }
      )
    }
    if (event.typeHeaderPage == TypeHeaderPage.LINK) {
      this.router.navigate([`/${config.routerLoginAdmin}/category/create`])
    }
  }

  delete(id: any) {
    this.componentActions.showLoading();
    this.adminService.deleteCategory(id).subscribe(res => {
      this.componentActions.showPopup({
        message: 'カテゴリーを削除しました',
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


  ngOnDestroy() {
    if (this.subject_save) {
      this.subject_save.unsubscribe();
    }
    if (this.subject_success) {
      this.subject_success.unsubscribe();
    }
  }
}
