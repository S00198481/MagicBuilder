import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'
import { DatabaseServiceService } from '../services/database-service.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-saved-decks',
  templateUrl: './saved-decks.component.html',
  styleUrls: ['./saved-decks.component.css']
})
export class SavedDecksComponent implements OnInit {

  constructor(private _magicService:MagicApiService, private _databaseService:DatabaseServiceService) { }
  savedDecks:JSON[];

  ngOnInit(): void {
    this._databaseService.getDecks().subscribe(deckData =>
      { this.savedDecks = deckData
      console.log(this.savedDecks)});
  }

  loadSelectedDeck() {

  }

  loadDecks() {

  }
}
