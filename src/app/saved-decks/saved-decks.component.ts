import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'
import { DatabaseServiceService } from '../services/database-service.service'
import { Deck } from '../deck-interface';
import  Popper, { PopperOptions }  from 'popper.js';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-saved-decks',
  templateUrl: './saved-decks.component.html',
  styleUrls: ['./saved-decks.component.css']
})
export class SavedDecksComponent implements OnInit {

  @Output() selectedDeck = new EventEmitter<Deck>();
  selectedDeckLocal:Deck;
  @Input() appPopper?: HTMLElement;
  @Input() placement?: string;
  @Input() target: HTMLElement;

  private popper:Popper;
  private readonly defaultConfig: PopperOptions = {
    placement: 'top',
    removeOnDestroy: true
  };

  constructor(private _magicService:MagicApiService, private _databaseService:DatabaseServiceService, private readonly el:ElementRef) { }
  savedDecks:Deck[];

  ngOnInit(): void {
    this.LoadAllDecks();

    const reference = this.appPopper ? this.appPopper : this.el.nativeElement;
  }
  ngOnDestroy(): void {
    if (!this.popper) {
      return;
    }
    this.popper.destroy();
  }

  LoadAllDecks() {
    this._databaseService.getDecks().subscribe(deckData => {
      this.savedDecks = deckData
      let dropdown = document.getElementById("dropdown");
      var count = 0; // this will contain the total elements.
      for (var i = 0; i < dropdown.childNodes.length; i++) {
        count++;
      }
      let noOfDecks = Object.keys(this.savedDecks).length;
      for (let i = 0; i < noOfDecks; i++) {
        let option = document.createElement("a");
        option.text = this.savedDecks[i].deckName;
        option.classList.add("dropdown-item")
        option.addEventListener('click', (e) => {
          this.loadSelectedDeck(this.savedDecks[i]);
      });
        dropdown.appendChild(option);
      }
    });
  }

  loadSelectedDeck(selectedDeck:Deck) {
    this.selectedDeck.emit(selectedDeck);
    this.selectedDeckLocal = selectedDeck;
  }

  deleteDeck() {
    var selectedDeck = this.selectedDeckLocal;
    try {
      this._databaseService.deleteDeck(selectedDeck);
      let dropdown = document.getElementById("dropdown")
      while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
        }
      this.selectedDeck.emit(null);
      window.alert("Deck deleted successfully!")
      } catch(err:any) {
        console.log("Error" + err);
      }
  }
}
