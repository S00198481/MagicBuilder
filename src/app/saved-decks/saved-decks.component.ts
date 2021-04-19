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
      if (dropdown.options.length != 0)
      {
        for(let i=0; i<dropdown.options.length; i++)
        {
          dropdown.options[i]=null;
        }
      }
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

  deleteDeck() {
    var dropdown = document.getElementById("dropdown") as HTMLSelectElement;
    var selectedDeck = dropdown.selectedIndex;
    try {
      this._databaseService.deleteDeck(this.savedDecks[selectedDeck]);
      for(let i=0; i<dropdown.options.length; i++)
          {
            dropdown.options[i]=null;
          }
      this.selectedDeck.emit(null);
      window.alert("Deck deleted successfully!")
      } catch(err:any) {
        console.log("Error" + err);
      }
  }
}
