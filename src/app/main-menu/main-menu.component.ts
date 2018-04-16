import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Room} from '../Room';
import {User} from '../User';
import {RoomService} from '../room.service';
import {UserService} from '../user.service';
import {SelectCharacterComponent} from './select-character/select-character.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {
  @Output() changeCharacterRequest = new EventEmitter<string>();
  mainMenuScreen: string;
  rooms: Room[];
  myself: User = new User();
  // ToDO get myself from DB
  defaultRoom: Room = new Room();

  @ViewChild('childCharacter')
  private childCharacter: SelectCharacterComponent;

  constructor(
    private roomService: RoomService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.mainMenuScreen = 'main-menu';
    this.myself = new User;
  }

  navigate(target: string) {
    console.log('Erhalten: navigationRequest | von MainMenuComponent| Target:' + target);
    this.mainMenuScreen = target;
    console.log('Info: this.mainMenuScreen: ' + this.mainMenuScreen);

    if (this.mainMenuScreen === 'main-menu') {
      this.restoreMainMenu();
    }

    if (this.mainMenuScreen === 'menubutton-hostgame') {
      this.myself.userID = -100;
      this.myself.name = 'MyName';
      this.myself.character = 1;
      this.myself.ready = false;

      this.defaultRoom.id = -100;
      this.defaultRoom.name = 'BesterRoomNameEver';
      this.defaultRoom.users = [this.myself];
      this.defaultRoom.boardnumber = 1;

      this.hostGame(this.defaultRoom);
    }

    if (this.mainMenuScreen === 'menubutton-joingame') {
      this.joinGame();
    }

    if (this.mainMenuScreen === 'menubutton-manual') {
      this.consultManual();
    }

  }

  private restoreMainMenu() {
    console.log('Restore MainMenu');
    this.childCharacter.generateMainMenuView();
  }

  private hostGame(defaultRoom) {
    console.log('REST: room added');
    this.roomService.addRoom(this.defaultRoom)
      .subscribe(room => {
        this.rooms.push(room);
      });
    this.childCharacter.generateHostView();
  }

  private joinGame() {
    this.childCharacter.generateJoinView();

  }

  private consultManual() {
    this.childCharacter.generateManualView();
  }
}
