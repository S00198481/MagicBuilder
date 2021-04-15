import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'
import { DatabaseServiceService } from '../services/database-service.service'
import { Deck } from '../deck-interface';

@Component({
  selector: 'app-saved-decks',
  templateUrl: './saved-decks.component.html',
  styleUrls: ['./saved-decks.component.css']
})
export class SavedDecksComponent implements OnInit {

  @Output() selectedDeck = new EventEmitter<Deck>();

  constructor(private _magicService:MagicApiService, private _databaseService:DatabaseServiceService) { }
  savedDecks:Deck[];

  ngOnInit(): void {
    this._databaseService.getDecks().subscribe(deckData =>
      { this.savedDecks = deckData
      console.log(this.savedDecks)
      let dropdown = document.getElementById("dropdown") as HTMLSelectElement;
      let noOfDecks = Object.keys(this.savedDecks).length;
      for(let i=0; i<noOfDecks; i++) {
        let option = document.createElement("option");
        option.text = this.savedDecks[i].deckName;
        option.value = JSON.stringify(this.savedDecks[i].deck);
        dropdown.add(option);
      }});

    
  }

  loadSelectedDeck() {
    var dropdown = document.getElementById("dropdown") as HTMLSelectElement;
    var selectedDeck = dropdown.selectedIndex;
    console.log(this.savedDecks[selectedDeck]);
    this.selectedDeck.emit(this.savedDecks[selectedDeck]);
  }
}
