import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../shared/models/character';
import {CHARACTERS} from '../../shared/models/character-database';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {RoomService} from '../../shared/services/room.service';
import {Observable} from 'rxjs/Observable';
import {Room} from '../../shared/models/Room';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-select-character',
  templateUrl: './select-character.component.html',
  styleUrls: ['./select-character.component.css']
})
export class SelectCharacterComponent implements OnInit {
  @Input()
  public me: User;
  areClickable: boolean;
  characters = CHARACTERS;
  selectedCharacter: Character;
  pollRoom: Room;
  private roomSubscription: any;


  constructor(private userService: UserService,
              private roomService: RoomService) {
  }

  ngOnInit() {
    this.areClickable = false;
    this.selectedCharacter = null;
  }

  generateMainMenuView() {
    this.restoreCharacterDefault();
  }

  // TO DELETE ? Keep in reserve for the case that emitting the same request as join does not work
  // generateHostView() {
  //   this.restoreCharacterDefault();
  //   this.areClickable = true;
  //   this.selectedCharacter = this.characters[0];
  // }

  // A.1 & A.2 | on join/host button clicked (see HTML join/host-buttons component)
  // 4. action: on got request
  // a) make opponents colored, not clickable
  // b) show details of opponents: name, tick
  // c) update opponents
  // 5. action: break
  // ToDO rename function since the same for host and join

  generateJoinView(room) {
    this.restoreCharacterDefault();
    this.areClickable = true;
    const roomId = room.roomID;
    /*
    +  pollHandCards(): void {
+    this.roomSubscription = Observable.interval(1000).subscribe(x => {
+      this.getHandPile();
+    });
     */
    // c) update opponents
    this.roomSubscription = Observable.interval(1000).subscribe(y => {
      this.roomService.getRoom(roomId).subscribe(
        request => {
          this.pollRoom = request;
          for (const user of this.pollRoom.users) {
            this.characters.filter(function (obj) {
              return obj.id === user.character;
            }).forEach(x => {

              // a) make opponents colored, not clickable
              // console.log('"Assigned" of Character :' + x.name + 'before: ' + x.assigned);
                x.assigned = true;
              // console.log('"Assigned" of Character :' + x.name + 'after: ' + x.assigned);

              // b) show details of opponents
              // console.log('"Ready" of Character :' + x.name + 'before: ' + x.ready);
                x.ready = user.ready;
              // console.log('"Ready" of Character :' + x.name + 'after: ' + x.ready);
                x.name = user.name;
              }
            );
          }
        }
      );
    });
  }

  // G | on home button clicked (see TS main-menu-button-board component, Function C: navigateToMenu)
  // 2. action: on view child: restore character default
  // 3. action: break
  generateManualView() {
    this.restoreCharacterDefault();
    console.log('test');
  }

  onSelect(character: Character): void {

    // a) check if already assignerd to opponent
    if (this.areClickable && !character.assigned) {

      // b) deselect priorly selected character
      if (this.selectedCharacter) {
        this.selectedCharacter.ready = false;
        this.selectedCharacter.assigned = false;
      }

      // c) assign character to self
      this.selectedCharacter = character;
      console.log('Selected Character | Name: ' + this.selectedCharacter.name);
      character.assigned = true;
      if (this.me) {
        this.me.character = this.selectedCharacter.id;

        // d) update self in backend
        this.userService.modifyUser(this.me);
      }
    }
  }


  // E | on ready button clicked (see HTML selected-character component)
  // 1. action:
  // a) set ready field of character to true
  // 2. action: on true: tick appears(see HTML selected-character component)
  onReady(character: Character) {
    character.ready = true;
  }


  // D | on character clicked (see HTML selected-character component)
  // 1. action:
  // a) check if already assigned to opponent
  // b) deselect priorly selected character
  // c) assign character to self
  // d) update self in backend

  // b) update name in backend
  updateUser(updatedName) {

    // a) update name locally
    console.log('Method Call | updateUser | in select-character');
    this.me.name = updatedName;

    // b) update name in backend
    this.userService.modifyUser(this.me);
    console.log('REST | put | userService.modifyUser(this.me)| this.me = ' + this.me.name);
  }


  // F | on self name changed (see HTML selected-character component)
  // 1. action:
  // a) update name locally

  // extracted helping function
  private restoreCharacterDefault() {
    this.areClickable = false;
    this.selectedCharacter = null;
    for (const character of this.characters) {
      character.ready = false;
      character.assigned = false;
    }
  }
}



