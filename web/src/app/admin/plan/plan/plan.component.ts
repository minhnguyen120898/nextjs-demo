import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from 'src/app/shared/components/alert/component-actions';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { ACTION_TYPE, TypeHeaderPage } from 'src/app/shared/enums/utils';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { environment as config } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  pageInfo: any = {
    img: 'assets/images/icon-plan.svg',
    title: 'プランを検索する',
    is_seacrh: true,
    is_new: true,
    holder_search: '検索する',
    text_new: 'プラン新規登録'
  }
  headers = [
    'NO.',
    '登録日',
    'プランタイトル',
    '作成者',
    '',
    ''
  ];
  panigation = {
    pageSize: 10,
    totalPage: 100,
    currentPage: 1,
    text: ''
  }
  subject_save: any = null;
  subject_close: any = null;
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
      if (res && res.join && res.data) {
        if (res.action == ACTION_TYPE.DELETE) {
          this.delete(res.id);
        }
      }
    });

    this.subject_close = this.componentActions.subject_close.subscribe((res: any) => {
      if (res.back) {
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
    this.adminService.getListPlan(
      this.panigation.currentPage,
      this.panigation.pageSize,
      this.panigation.text
    ).subscribe(res => {
      this.componentActions.hideLoading();
      this.panigation.totalPage = res.total;
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
          title: '2022/10/25 19:00',
        },
        { title: 'タイトル' },
        {
          title: '山田太郎'
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
    console.log(event);

    if (event.action == 'pagesize') {
      this.router.navigate([`/${config.routerLoginAdmin}/plan`],
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
      this.router.navigateByUrl(`/${config.routerLoginAdmin}/plan/update/${event.id}`)
    }
    if (event.action == ACTION_TYPE.DELETE) {
      this.componentActions.showPopup({
        message: `【${event.item.title}】\n削除しますか？`,
        mode: CrudType.CONFIRM,
        action: ACTION_TYPE.DELETE,
        id: event.id,
        text: 'はい'
      });
    }
  }


  handlePage(page: any) {
    this.router.navigate([`/${config.routerLoginAdmin}/plan`],
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
      this.router.navigate([`/${config.routerLoginAdmin}/plan`],
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
      this.router.navigate([`/${config.routerLoginAdmin}/plan/create`])
    }
  }

  delete(id: any) {
    this.adminService.deletePlan(id).subscribe(res => {
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
}
