import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../shared/models/Card';
import {PlayerService} from '../../shared/services/player.service';
import {Player} from '../../shared/models/Player';
import {MoveService} from '../../shared/services/move.service';
import {CoinsService} from '../../shared/services/coins.service';
import {HandcardService} from '../../shared/services/handcards.service';

// import {CARDS} from '../../shared/models/Card-database';

@Component({
  selector: 'app-card-slot',
  templateUrl: './card-slot.component.html',
  styleUrls: ['./card-slot.component.css']
})
export class CardSlotComponent implements OnInit {

  @Input()
  public card: Card;

  // @Output() updateHand = new EventEmitter<Card[]>();

  // store new Handpile after selling/ discarding
  public hand: Card[];
  // intermediate step to store response from selling/discarding
  public player: Player;
  public isActive = false;
  public margin = 50;


  constructor(private playerService: PlayerService,
              private moveService: MoveService,
              private coinsService: CoinsService,
              private handcardService: HandcardService) {
  }

  ngOnInit() {
    console.log(this.card.name);
  }

  sell() {
    console.log('why you not sell????');
    this.playerService.sell(this.card).subscribe(
      response => {
        // console.log(response);
        this.player = response;
        console.log('seeeeelll response', response);
        this.hand = this.player.handPile;
        console.log('after Sell', this.hand);
        this.handcardService.setCards(this.hand);
        // console.log(this.hand);
        // this.updateHand.emit(this.hand);
        this.coinsService.updateLocalCoinNumber(this.player.coins);
      }
    );
  }

  onSelect() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.moveService.addCard(this.card);
    }else {
      this.moveService.removeCard(this.card);
    }
  }

  discard() {
    this.playerService.discard(this.card).subscribe(
      response => {
        // console.log(response);
        this.player = response;
        this.hand = this.player.handPile;
        this.handcardService.setCards(this.hand);
        // console.log(this.hand);
        // this.updateHand.emit(this.hand);
      }
    );
  }

  magnify() {
  }
}
