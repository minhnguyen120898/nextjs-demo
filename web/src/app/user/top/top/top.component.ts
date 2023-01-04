import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopService } from '../top.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 500,
    nav: false,
    dots: true,
    mouseDrag: false,  
    touchDrag: false,
    pullDrag: false,
    // lazyLoad: true,
    center: true,
    margin: 37,
    stagePadding: 51,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['&lsaquo;', '&rsaquo;'],
    responsive: {
      0: {
        items: 1
      },
      414: {
        items: 1,
      },
      768: {
        items: 3,
        margin: 64,
        stagePadding: 0,
      }
    }
  };

  customOptions2: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    // lazyLoad: true,
    center: window.innerWidth < 768 ? true : false,
    margin: 10,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['&lsaquo;', '&rsaquo;'],
    responsive: {
      0: {
        items: 1
      },
      414: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 5
      }
    }
  };
  listBanner: any[] = [1, 2, 3, 4, 5, 6];
  listCategorys: any[] = [];
  listData: any[] = []

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
    pageSize: 12,
    totalPage: 0,
    currentPage: 1
  };
  constructor(private topService: TopService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {

    this.topService.getListBanner(1, 50).subscribe(res => {
      let datas = res.docs.map((e: any) => {
        return {
          id: e._id,
          background: `url(${e.image})`,
          title: '',
          url: e.url
        }
      });
      this.listBanner = datas;
    }, err => {
    });

    await this.topService.getCategory().then((res: any) => {
      this.listCategorys = res;
    }).catch(err => {
      this.listCategorys = err;
    });

    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.listCategorys.forEach(e => {
        e.active = false;
      });
      if (res.category_id) {
        const element = this.listCategorys.find((e: any) => {
          return e._id == res.category_id;
        });
        if (element) {
          element.active = true;
        }

        this.getData(res, element);
      } else {
        this.listCategorys[0].active = true;
        this.getData(res, this.listCategorys[0]);
      }
    });
  }

  navigateBanner(item: any) {
    window.open(item.url, 'target=_black');
  }

  getData(qparam: any, category: any) {

    this.panigation.currentPage = qparam && qparam.page ? Number(qparam.page) : 1;
    this.panigation.pageSize = qparam && qparam.pagesize ? Number(qparam.pagesize) : 6;
    this.listData = [];
    if (category) {
      for (let index = 0; index < category.childs.length; index++) {
        const element = category.childs[index];
        let obj: any = {
          title: element.title,
          id: element._id,
          image: element.image,
          datas: []
        }

        this.topService.getListWorkByCategory(element._id, this.panigation.currentPage,
          this.panigation.pageSize).subscribe(res => { 
            let datas = res.docs.map((e: any) => {
              return {
                id: e._id,
                background: `url(${e.eye_catching})`,
                title: e.title,
                tag: e.tag
              }
            });
            obj.datas = datas;
            this.listData.push(obj);
          }, err => {
          });
      }
    }
  }

  handleAction(event: any) {
    this.router.navigate(['/'],
      {
        queryParams: {
          page: event
        }, fragment: 'inner-delivery-data'
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
