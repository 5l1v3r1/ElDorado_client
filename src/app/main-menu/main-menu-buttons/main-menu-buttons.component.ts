import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MAINMENUBUTTONS} from '../../button-database';

@Component({
  selector: 'app-main-menu-buttons',
  templateUrl: './main-menu-buttons.component.html',
  styleUrls: ['./main-menu-buttons.component.css']
})
export class MainMenuButtonsComponent implements OnInit {
  @Input() name: string;
  @Output() changeButtonsRequest = new EventEmitter<string>();
  buttons = MAINMENUBUTTONS;

  constructor() {
  }

  navigateTo(target: string) {
    this.changeButtonsRequest.emit(target);
    console.log(target + ' Button wurde geklickt');
    console.log('Gesendet: changeButtonsRequest | von main-menu-buttons | Target:' + target + ' | Empfänger:main-menu-button-board');
  }

  ngOnInit() {
    // this.navigationTarget = 'menu';
  }
}

// ToDO: In Template set button positions automatically

