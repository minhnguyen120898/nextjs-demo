import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { TopService } from '../top.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  data: any = {};
  notice_id: any = null;
  constructor(private topService: TopService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private timeService: TimeService
  ) { }

  async ngOnInit() {
    this.notice_id = this.activatedRoute.snapshot.paramMap.get('noticeid');
    if (this.notice_id) {
      this.activatedRoute.queryParams.subscribe(res => {
        this.getData(res)
      });
    }
  }

  navigateBanner(item: any) {
    window.open(item.url, 'target=_black');
  }

  getData(qparam: any) {
    this.topService.getNoticeDetail(this.notice_id).subscribe(res => {
      res.time = this.timeService.formatDateFromTimeUnix(res.created_at / 1000, 'YYYY.MM.DD')
      console.log(res);
      this.data = res;
    }, err => {
    });
  }

  handlePage(page: any) {
    this.router.navigate([`/category/${this.notice_id}`],
      {
        queryParams: {
          page: page
        },
        queryParamsHandling: 'merge'
      }
    )
  }

  handleAction(event: any) {
    this.router.navigate(['/'],
      {
        queryParams: {
          page: event
        }
      }
    )
  }


  showAsswer(item: any, index: number) {

    let element = document.getElementById(`text-answer-${index}`) as HTMLElement;
    if (element.style.maxHeight && element.style.maxHeight != '0px') {
      element.style.maxHeight = '0px';
      item['isShowAnswer'] = false;
    } else {
      element.style.maxHeight = `${element.scrollHeight}px`;
      item['isShowAnswer'] = true;
    }
  }
}
