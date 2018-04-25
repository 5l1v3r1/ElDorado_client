import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PlayerService} from '../shared/services/player.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {INTERVAL} from '../shared/services/INTERVAL';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})
export class InGameScreenComponent implements OnInit {
  public ownPlayerId = Number(localStorage.getItem('playerId'));
  public loading = INTERVAL.loading();
  private loadingSubscription: Subscription;

  constructor(  private route: ActivatedRoute,
                private location: Location) { }

  ngOnInit() {
    this.loadingSubscription = Observable.interval(1000).subscribe(
        res => {
      this.loading--;
      if (this.loading <= 0 ) {
        this.loadingSubscription.unsubscribe();
      }
    }
    );
  }

}
