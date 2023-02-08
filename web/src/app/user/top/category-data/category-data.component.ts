import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopService } from '../top.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fromEvent, debounceTime, takeUntil, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrls: ['./category-data.component.scss']
})
export class CategoryDataComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    nav: false,
    dots: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplaySpeed: 500,
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
        items: 1
      },
      768: {
        items: 3,
        margin: 64,
        stagePadding: 0,
      }
    }
  };

  customWidth = window.innerWidth < 768 ? 105 : 250;
  subscription = new Subject();
  customOptions2: OwlOptions = {
    loop: false,
    nav: true,
    dots: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoWidth: true,
    // lazyLoad: true,
    center: false,
    margin: 5,
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
        items: 3,
        margin: 15,
      },
      992: {
        items: 5,
        margin: 15,
      }
    }
  };
  listBanner: any[] = [1, 2, 3, 4, 5, 6];
  listData: any[] = []

  panigation = {
    pageSize: 16,
    totalPage: 0,
    currentPage: 1
  };

  category_id: any = null;
  host = environment.host;

  constructor(private topService: TopService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.category_id = this.activatedRoute.snapshot.paramMap.get('categoryid');
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

    if (this.category_id) {
      this.activatedRoute.queryParams.subscribe(res => {
        this.getData(res)
      });
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    fromEvent(window, 'resize').pipe(
      debounceTime(10),
      takeUntil(this.subscription)
    ).subscribe(res => {
      if (window.innerWidth < 768) {
        this.customWidth = 105;
      } else {
        this.customWidth = 250;
      }
      this.customOptions2 = {...this.customOptions2};
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.next(true);
    this.subscription.complete();
  }

  navigateBanner(item: any) {
    window.open(item.url, 'target=_black');
  }

  getData(qparam: any) {
    this.panigation.currentPage = qparam && qparam.page ? Number(qparam.page) : 1;
    this.listData = [];
    this.topService.getListWorkByCategory(this.category_id, this.panigation.currentPage,
      this.panigation.pageSize).subscribe(res => {
        let datas = res.docs.map((e: any) => {
          return {
            id: e._id,
            background: e.eye_catching,
            title: e.title,
            tag: e.tag
          }
        });
        this.listData = datas;
        this.panigation.totalPage = res.total;
      }, err => {
      });
  }

  handlePage(page: any) {
    this.router.navigate([`/category/${this.category_id}`],
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
