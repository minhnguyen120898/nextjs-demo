import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { PagerService } from '../../../services/helpers/pager.service';
declare var $: any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [PagerService]
})
export class DataTableComponent implements OnInit {
  @Input() items: any;
  @Input() headers: any[] = [];
  @Input() pageSize = 10;
  @Input() showPage = true;
  @Input() totalPage = 0;
  @Input() currentPage = 1;
  @Input() showSearch = false;
  @Input() class : string = 'purple';
  @Input() showOptionSize : boolean = true;

  @Output() outputActions = new EventEmitter();
  @Output() outputPage = new EventEmitter();
  pager: any = {};
  
  constructor(private pagerService: PagerService
  ) { }

  @HostListener("window:click", ['$event.target'])
  onClickWindow(e: any) {
    if (e.id != 'drop-pagesize-title') {
      if(document.getElementById('drop-pagesize')){
        (<HTMLElement>document.getElementById('drop-pagesize')).style.display = 'none';
      }
    }
    
    // Toggle dropdown via class `dropdown-action`
    let attrClass = e.getAttribute("class")
    if(!attrClass?.includes('btn-outline-primary')){
      let classDropdown = document.getElementsByClassName('dropdown-action');
      if(classDropdown) {
          this.items.forEach((o:any) => {o.drop = false;o.drop2 = false})
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges(change: any) {
    this.setPage(this.currentPage);
  }

  setPage(page: any) {
    this.pager = this.pagerService.getPager(this.totalPage, page, this.pageSize);
  }

  choosepage(page: number) {
    if(page < 1){
      page = 1;
    }
    if(page > this.pager.totalPages){
      page = this.pager.totalPages;
    }
    this.setPage(page);
    if (this.currentPage != page) {
      this.outputPage.emit(page);
    }
  }

  clickAction(item: any, content: any) {
    this.outputActions.emit({ ...item, action:content.action  });
  }

  changePageSize(pageSize: number) {
    (<HTMLElement>document.getElementById('drop-pagesize')).style.display = 'none';
    localStorage.setItem('page_size', pageSize.toString())
    this.outputActions.emit({ action: 'pagesize', value: pageSize});
  }

  showDrop(item: any) {
    this.items.forEach((e: any) => {
      if(item == e){
        item.drop = !item.drop
      }else{
        e.drop = false;
      }
    })
  }

  showDropActions2(item: any) {
    this.items.forEach((e: any) => {
      if(item == e){
        item.drop2 = !item.drop2
      }else{
        e.drop2 = false;
      }
    })
  }

  showDropPageSize() {
    (<HTMLElement>document.getElementById('drop-pagesize')).style.display = 'block';
  }
}