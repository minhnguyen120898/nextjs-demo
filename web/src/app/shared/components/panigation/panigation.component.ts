import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { PagerService } from 'src/app/shared/services/helpers/pager.service';

@Component({
  selector: 'app-panigation',
  templateUrl: './panigation.component.html',
  styleUrls: ['./panigation.component.scss']
})
export class PanigationComponent implements OnInit {
  @Input() pageSize = 0;
  @Input() totalPage = 0;
  @Input() currentPage = 1;
  @Input() class : string = 'purple';
  @Output() outputPage = new EventEmitter();

  pager: any = {};
  next_page = 5;
  constructor(private pagerService: PagerService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setPage(this.currentPage);
  }

  setPage(page: any) {
    this.pager = this.pagerService.getPager(this.totalPage, page, this.pageSize);
  }

  choosepage(page: any, step?: any) {
    if (!step) {
      if (page > this.pager.endPage || page < this.pager.startPage) {
        return;
      }
      if (page === '...') {
        page = this.currentPage + 2;
      }

      if (this.currentPage != page) {
        this.outputPage.emit(page);
      }
    }
    if (step && step === 'last') {
      const page_last = (page + this.next_page) > this.pager.totalPages ? this.pager.totalPages : (page + this.next_page);
      this.outputPage.emit(page_last);
      this.setPage(page_last);
    }
    if (step && step === 'home') {
      const page_home = (page - this.next_page) > 0 ? (page - this.next_page) : 1;
      this.outputPage.emit(page_home);
      this.setPage(page_home);
    }
  }

}
