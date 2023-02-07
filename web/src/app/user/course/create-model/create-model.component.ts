import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss']
})
export class CreateModelComponent implements OnInit {

  actions = {
    showStartPoint: false,
    showDayOfWeek: false,
    showSightSeeingTime: false,
    showTransportation: false,
    showDepartureTime: false,
    isShowAliasModal: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  openDropdown(keyValue: string) {
    this.actions.isShowAliasModal = true;
    for (const key in this.actions) {
      if (Object.prototype.hasOwnProperty.call(this.actions, key) && key === keyValue) {
        this.actions[key as keyof typeof this.actions] = !this.actions[key as keyof typeof this.actions];
      }
    }
  }

  closeDropdown() {
    for (const key in this.actions) {
      if (Object.prototype.hasOwnProperty.call(this.actions, key)) {
        this.actions[key as keyof typeof this.actions] = false;
      }
    }
  }
}
