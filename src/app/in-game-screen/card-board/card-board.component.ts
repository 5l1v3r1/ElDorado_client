import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Player} from '../../shared/models/Player';
import {CardsService} from '../../shared/services/cards.service';
import {INTERVAL} from '../../shared/services/INTERVAL';
import {SoundService} from '../../shared/services/sound.service';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.css']
})
export class CardBoardComponent implements OnInit, OnDestroy {

  public isActive = false;
  public player: Player;
  public cards: Card[];
  public selectedCards: Card[] = [];
  public singleActionCard: boolean;

  private playerSubscription: Subscription;
  private handCardSubscribtion: Subscription;
  private selectedCardSubscription: Subscription;

  constructor(private playerService: PlayerService,
              private cardsService: CardsService,
              private sound: SoundService) {
  }


  ngOnInit() {
    this.playerSubscription = this.playerService.playerSub.subscribe(
      player => {
        try {
          this.player = player;
        } catch (e) {
          console.log('-Card Board Update: Player not yet defined');
        }
      }
    );
    this.handCardSubscribtion = this.playerService.playerHandcardSub.subscribe(
      cards => {
        try {
          this.cards = cards;
        } catch (e) {
          console.log('-Card Board Update: Handcard not defined yet');
        }
      }
    );
    this.selectedCardSubscription = this.cardsService.selectedardsSub.subscribe(
      selectedCards => {
        try {
          this.selectedCards = selectedCards;
          this.checkForSingleActionCard();
        } catch (e) {
          console.log('-Card Board: Error in updating Cards or checking for singlecard');
        }
      }
    );
    // this.ngOnInit();
    this.singleActionCard = false;
  }

  onSelect() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.sound.close();
    } else {
      this.sound.open();
    }
  }

  private checkForSingleActionCard() {
    if (this.selectedCards.length === 1) {
      this.singleActionCard = (this.selectedCards[0].type === 'ActionCard' || this.selectedCards[0].type === 'RemoveActionCard');
    } else {
      this.singleActionCard = false;
    }
  }

  ngOnDestroy() {
    this.selectedCardSubscription.unsubscribe();
    this.handCardSubscribtion.unsubscribe();
    this.playerSubscription.unsubscribe();
  }
}
