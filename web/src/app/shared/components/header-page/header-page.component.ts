import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TypeHeaderPage } from '../../enums/utils';


@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {
  @Input() data: any;
  @Output() changeHandler = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }


  onSearch(event:any, text:string) {
    if(text.trim() == ''){
      this.changeHandler.emit({typeHeaderPage: TypeHeaderPage.SEARCH, 
        text: text
      })
      return
    }
    if(event.keyCode == 13) {
      this.changeHandler.emit({typeHeaderPage: TypeHeaderPage.SEARCH,  text: text})
    }
  }

  addNew() {
    this.changeHandler.emit({typeHeaderPage: TypeHeaderPage.LINK})
  }


}
