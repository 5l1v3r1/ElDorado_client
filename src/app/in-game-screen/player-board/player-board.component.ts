import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {Game} from '../../shared/models/Game';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../shared/services/game.service';
import {Observable} from 'rxjs/Observable';
import {INTERVAL} from '../../shared/services/INTERVAL';
// import {Player} from '../../shared/models/Player';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.css']
})
export class PlayerBoardComponent implements OnInit, OnDestroy {
  public game: Game;
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public ownCharacterId: number;
  public ownPlayer: Player;
  public current: Player;
  public hand: Card[];
  public currentPlayerId = -1;

  public currentSubscribtion: Subscription;

  constructor(private playerService: PlayerService, private gameService: GameService) {
    /*this.gameService.currentSub.subscribe(
      current => {
        try {
          this.current = current;
          this.currentPlayerId = this.current.playerId;
        } catch (e) {
          console.log('-Player Board Update: Current is not ready yet');
        }
      }
    );*/
  }

  ngOnInit() {
    this.currentSubscribtion = this.gameService.currentSub.subscribe(
      current => {
        try {
          this.current = current;
          this.currentPlayerId = this.current.playerId;
        } catch (e) {
          console.log('-Player Board Update: Current is not ready yet');
        }
      }
    );
    this.gameService.rawGetter().subscribe(
      response => {
        this.playerService.rawGetter().subscribe(
          res => {
            this.ownPlayer = res;
            this.ownCharacterId = this.ownPlayer.characterNumber;
          }
        );
        const game: Game = response;
        this.current = game.current;
      }
    );
  }

  ngOnDestroy() {
    this.currentSubscribtion.unsubscribe();
  }

}
