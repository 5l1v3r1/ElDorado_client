import {Component, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';
import {Observable} from 'rxjs/Observable';
// import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit {
  public game: Game;
  public handpile: Card[];
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public ownCharacterId: number;
  public ownPlayer: Player;
  public current: Player;
  private currentSubscription: Subscription;
  public hand: Card[];

  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit() {
    this.playerService.rawGetter().subscribe(
      response => {
        const players: Player[] = response;
        this.ownPlayer = players.filter(player => player.playerId === Number(localStorage.getItem('playerId')))[0];
        this.ownCharacterId = this.ownPlayer.characterNumber;
        this.currentSubscription = Observable.interval(1000).subscribe(
          res => {
            this.current = this.gameService.getCurrent();
          }
        );
      }
    );
  }

  getOwnCharacterId(): void {
    this.ownPlayer = this.playerService.getPlayer();
    this.ownCharacterId = this.ownPlayer.characterNumber;
    console.log('My character id from getOwnCharacterId: ' + this.ownCharacterId);
  }
}
