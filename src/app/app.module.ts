import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {TitleComponent} from './main-menu/title/title.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';
import {OpponentBoardComponent} from './in-game-screen/opponent-board/opponent-board.component';
import {PlayerBoardComponent} from './in-game-screen/player-board/player-board.component';
import {SettingsBoardComponent} from './in-game-screen/settings-board/settings-board.component';
import {MarketplaceComponent} from './in-game-screen/marketplace/marketplace.component';
import {CardBoardComponent} from './in-game-screen/card-board/card-board.component';
import {CardSlotComponent} from './in-game-screen/card-slot/card-slot.component';
import {ButtonBoardComponent} from './in-game-screen/button-board/button-board.component';
import {CardComponent} from './in-game-screen/marketplace/card/card.component';
import {MarketSlotComponent} from './in-game-screen/market-slot/market-slot.component';
import {MarketboardComponent} from './in-game-screen/marketboard/marketboard.component';
import {AppRoutingModule} from './app-routing.module';
import {RoomService} from './shared/services/room.service';
import {MainMenuButtonBoardComponent} from './main-menu/main-menu-button-board/main-menu-button-board.component';
import {HostButtonsComponent} from './main-menu/host-buttons/host-buttons.component';
import {MainMenuButtonsComponent} from './main-menu/main-menu-buttons/main-menu-buttons.component';
import {BoardComponent} from './in-game-screen/map/board/board.component';
import {HexspaceComponent} from './in-game-screen/map/hexspace/hexspace.component';
import {HttpModule, JsonpModule} from '@angular/http';
import {PlayerService} from './shared/services/player.service';
import {UserService} from './shared/services/user.service';
import {JoinButtonsComponent} from './main-menu/join-buttons/join-buttons.component';
import {GameService} from './shared/services/game.service';
import {CardsService} from './shared/services/cards.service';
import {CharacterComponent} from './main-menu/character/character.component';
import {CharacterSelectionComponent} from './main-menu/character-selection/character-selection.component';
import {DefaultCharacterComponent} from './main-menu/default-character/default-character.component';
import {LoadingScreenComponent} from './in-game-screen/loading-screen/loading-screen.component';
import {WinnerScreenComponent} from './in-game-screen/winner-screen/winner-screen.component';
import {MagnifyComponent} from './in-game-screen/card-slot/magnify/magnify.component';
import {BudgetBoardComponent} from './in-game-screen/budget-board/budget-board.component';
import {BoardService} from './shared/services/board.service';
import {EldoradoReachedScreenComponent} from './in-game-screen/eldorado-reached-screen/eldorado-reached-screen.component';
import {MarketCardComponent} from './in-game-screen/market-card/market-card.component';
import {TutorialComponent} from './tutorial/tutorial.component';
import {HistoryComponent} from './in-game-screen/opponent-board/history/history.component';
import {PanelComponent} from './in-game-screen/panel/panel.component';
import {SettingsService} from './shared/services/settings.service';
import {LastRoundBoardComponent} from './in-game-screen/last-round-board/last-round-board.component';
import {SoundService} from './shared/services/sound.service';
// import { HttpClientModule} from '@angular/common/http';
// import {LoginComponent} from './login/login.component';
// import {routing} from './app.routing';
// import {AuthGuardService} from './shared/services/auth-guard.service';
// import {AuthenticationService} from './shared/services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    MainMenuComponent,
    TitleComponent,
    InGameScreenComponent,
    OpponentBoardComponent,
    PlayerBoardComponent,
    SettingsBoardComponent,
    MarketplaceComponent,
    CardBoardComponent,
    CardSlotComponent,
    ButtonBoardComponent,
    CardComponent,
    MarketSlotComponent,
    MarketboardComponent,
    MainMenuButtonBoardComponent,
    HostButtonsComponent,
    MainMenuButtonsComponent,
    BoardComponent,
    HexspaceComponent,
    JoinButtonsComponent,
    CharacterComponent,
    CharacterSelectionComponent,
    DefaultCharacterComponent,
    LoadingScreenComponent,
    WinnerScreenComponent,
    MagnifyComponent,
    BudgetBoardComponent,
    EldoradoReachedScreenComponent,
    TutorialComponent,
    MarketCardComponent,
    HistoryComponent,
    PanelComponent,
    LastRoundBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // routing,
    AppRoutingModule,
    HttpModule,
    JsonpModule
  ],
  providers: [RoomService, PlayerService, UserService, GameService, CardsService, BoardService, SettingsService, SoundService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
