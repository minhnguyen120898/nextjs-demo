import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.scss']
})
export class ModelSearchComponent implements OnInit {
  @Input() holder : string = '';
  @Input() tab: string = '';
  @Input() enableFilter: boolean = false;
  @Output() textSearch = new EventEmitter();
  @Output() outputSearch = new EventEmitter();
  @Output() filter = new EventEmitter();

  isActived = false;

  constructor() { }

  ngOnInit() {
  }

  searchName(text: any, tab: any) {
    if (this.textSearch) {
      this.textSearch.emit({ text: text, tab: tab })
    }
  }

  handleKeyDown(text: any, event: any) {
    if (event.key == "Enter") {
      this.outputSearch.emit({
        text: text
      })
    }
  }

  click_filter() {
    this.isActived = !this.isActived;
    this.filter.emit();
  }
}
