import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopService } from '../top.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { debounceTime, forkJoin, fromEvent, map, repeat, startWith, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  customWidth = window.innerWidth < 768 ? 156 : 250;
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
  listCategories: any[] = [];
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

  subscription = new Subject();

  isDragging = false;
  currentX: number;
  initialX: number;
  xOffset = 0;

  constructor(private topService: TopService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {

    this.topService.getListBanner(1, 50, 'field=created_at&sort=1').subscribe(res => {
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

    await this.topService.getCategory('field=created_at&sort=1').then((res: any) => {
      this.listCategories = res;
      this.listCategories[0].active = true;
    }).catch(err => {
      this.listCategories = err;
    });

    this.getData();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      takeUntil(this.subscription)
    ).subscribe(res => {
      if (window.innerWidth < 768) {
        this.customWidth = 156;
      } else {
        this.customWidth = 250;
      }
      this.listData = JSON.parse(JSON.stringify(this.listData));
    })

    const element = document.getElementById("scrollContainer");

    if (element) {
      element.addEventListener("mousedown", this.dragStart);
      element.addEventListener("mouseup", this.dragEnd);
      element.addEventListener("mouseleave", this.dragEnd);
      element.addEventListener("mousemove", this.drag);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    const element = document.getElementById("scrollContainer");

    if (element) {
      element.removeEventListener("mousedown", this.dragStart);
      element.removeEventListener("mouseup", this.dragEnd);
      element.removeEventListener("mouseleave", this.dragEnd);
      element.removeEventListener("mousemove", this.drag);
    }
    this.subscription.next(true);
    this.subscription.complete();
  }

  navigateBanner(item: any) {
    window.open("https://google.com", 'target=_black');
  }

  getData() {
    this.panigation.currentPage = 1;
    this.panigation.pageSize = 12;
    this.listData = [];
    
    let observables = [];
    for (let index = 0; index < this.listCategories.length; index++) {
      const element = this.listCategories[index];
      let obj: any = {
        title: element.title,
        id: element._id,
        image: element.image,
        datas: []
      }
      this.listData.push(obj);
      observables.push(
        this.topService.getListWorkByCategory(
          element._id, 
          this.panigation.currentPage,
          this.panigation.pageSize
        )
      )
    }

    forkJoin(observables).subscribe(res => { 
      this.listData.forEach((e, index) => {
        let datas = res[index].docs.map((e: any) => {
          return {
            id: e._id,
            background: `url(${e.eye_catching})`,
            title: e.title,
            tag: e.tag
          }
        });
        e.datas = e.datas.concat(datas);
      })
    }, err => {
    });
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

  scrollToSection(id: string) {
    this.listCategories.forEach(e => {
      if (e._id === id) {
        e.active = true;
      } else {
        e.active = false;
      }
    })
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  dragStart = (e: MouseEvent) => {
    this.initialX = e.clientX;
    this.isDragging = true;
  }

  dragEnd = (e: MouseEvent) => {
    this.isDragging = false;
  }

  drag = (e: MouseEvent) => {
    if (this.isDragging) {
      e.preventDefault();
      this.currentX = e.clientX;
      this.xOffset = this.currentX - this.initialX;
      const element = document.getElementById("scrollContainer");
      if (element) {
        element.scrollLeft -= this.xOffset;
      }
      this.initialX = this.currentX;
    }
  }
}
