import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss']
})
export class TableElementComponent implements OnInit {
 @Input() data : any[] =[]; 
 @Output() outputActions = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickAction(item : any) {
    this.outputActions.emit(item);
  }
}
