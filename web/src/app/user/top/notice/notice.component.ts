import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { TopService } from '../top.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  listData: any[] = []

  panigation = {
    pageSize: 6,
    totalPage: 0,
    currentPage: 1
  };

  category_id: any = null;
  constructor(private topService: TopService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private timeService: TimeService
  ) { }

  async ngOnInit() {
      this.activatedRoute.queryParams.subscribe(res => {
        this.getData(res)
      });
  }

  navigateBanner(item: any) {
    window.open(item.url, 'target=_black');
  }

  getData(qparam: any) {
    this.panigation.currentPage = qparam && qparam.page ? Number(qparam.page) : 1;
    this.listData = [];
    this.topService.getListNotice(this.panigation.currentPage,
      this.panigation.pageSize).subscribe(res => {

        let datas = res.docs.map((e: any) => {
          return {
            ...e,
            time: this.timeService.formatDateFromTimeUnix(e.created_at / 1000, 'YYYY.MM.DD')
          }
        });
        this.listData = datas;
        this.panigation.totalPage = res.total;
      }, err => {
      });
  }

  handleAction(event: any) {
    this.router.navigateByUrl(`/notice/${event._id}`)
  }

  handlePage(page: any) {
    this.router.navigate([`/notice/`],
      {
        queryParams: {
          page: page
        }
      }
    )
  }
}
