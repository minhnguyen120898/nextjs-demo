import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopService } from '../top.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  listPage: any[] = [1, 2, 3, 4, 5, 6];
  list: any[] = [1, 2, 3, 4, 5, 6];
  dataFaq = [
    {
      isShowAnswer: false,
      question: 'ここに質問が入ります。',
      answer: 'ここに質問の答えが入ります。ここに質問の答えが入ります。ここに質問の答えが入ります。'
    },
    {
      isShowAnswer: false,
      question: 'ここに質問が入ります。',
      answer: 'ここに質問の答えが入ります。ここに質問の答えが入ります。ここに質問の答えが入ります。'
    },
    {
      isShowAnswer: false,
      question: 'ここに質問が入ります。',
      answer: 'ここに質問の答えが入ります。ここに質問の答えが入ります。ここに質問の答えが入ります。'
    },
    {
      isShowAnswer: false,
      question: 'ここに質問が入ります。',
      answer: 'ここに質問の答えが入ります。ここに質問の答えが入ります。ここに質問の答えが入ります。'
    }
  ]

  panigation = {
    pageSize: 6,
    totalPage: 0,
    currentPage: 1
  };
  constructor(private topService: TopService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.getData(res)
    });
  }

  getData(qparam: any) {
    this.panigation.currentPage = qparam && qparam.page ? Number(qparam.page) : 1;
    this.panigation.pageSize = qparam && qparam.pagesize ? Number(qparam.pagesize) : 6;
    this.topService.getListPage(this.panigation.currentPage,
      this.panigation.pageSize).subscribe(res => {
        this.listPage = res.docs.map((e:any)=>{
          return {
            id: e._id,
            banner: e.banner,
            name: e.name,
            store_name: e.store_name,
            logo: e.logo_top
          }
        });
        this.panigation.totalPage = res.total;
      }, err => {
      });
  }

  handleAction(event: any) {
    this.router.navigate(['/'],
      {
        queryParams: {
          page: event
        },fragment: 'inner-delivery-data'
      }
    )
  }


  showAsswer(item: any, index: number) {

    let element = document.getElementById(`text-answer-${index}`) as HTMLElement;
    if (element.style.maxHeight &&  element.style.maxHeight !='0px') {
      element.style.maxHeight = '0px';
      item['isShowAnswer'] = false;
    } else {
      element.style.maxHeight = `${element.scrollHeight}px`;
      item['isShowAnswer'] = true;
    }
  }
}
