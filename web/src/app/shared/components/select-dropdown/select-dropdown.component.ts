import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {
  @Input() options: any = [];
  @Input() nameSelect: string = '';
  @Input() block:  any = null;
  @Input() multi: boolean = false;

  @Output() selectedOption = new EventEmitter();
  isOpen = false;
  constructor() { }

  ngOnInit() {
  }
  
  handleSelectOption(value: any) {
    this.nameSelect = value.itemName;
    this.selectedOption.emit({ value: value });
    this.openDropdown();
  }

  openDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropDown() {
    this.isOpen = false
  }

  setMulti(event: any, option: any) {
    const dom = document.getElementsByClassName('option-checked');
    const arr: any = [];
    for (let index = 0; index < dom.length; index++) {
      const element = dom[index] as HTMLInputElement;
      if (element.checked) {
        arr.push(element.name);
      }
    }
    
    this.selectedOption.emit(arr);
  }
}
