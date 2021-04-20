import { Component, OnInit, Output, Input, EventEmitter, SimpleChange } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'
import { DatabaseServiceService } from '../services/database-service.service'
import { Deck } from '../deck-interface';

@Component({
  selector: 'app-deck-build',
  templateUrl: './deck-build.component.html',
  styleUrls: ['./deck-build.component.css']
})
export class DeckBuildComponent implements OnInit {

  @Output() chosenColour = new EventEmitter<string>();
  @Output() chosenCmc = new EventEmitter<number>();
  @Output() currentShow = new EventEmitter<boolean>();
  @Output() buttonShow = new EventEmitter<boolean>();

  @Input() currentDeck:JSON; 
  @Input() totalCards:number;

  @Output() clearedDeck = new EventEmitter<JSON>();
  @Output() noCards = new EventEmitter<number>();

  constructor(private _magicService:MagicApiService, private _databaseService:DatabaseServiceService) {
    
  }
   
  ngOnInit(): void {
  }
  show:boolean;
  colour:string;
  cmc:number;
  deckFull:boolean;

  applyColour(event) {
    var target = event.target;
    this.chosenColour.emit(target.value);
  }

  applyCmc(event) {
    console.log("in cmc")
    var target = event.target;
    this.chosenCmc.emit(target.value);
  }

  changeShow(event) {
    this.currentShow.emit(this.show);
  }

  checkDeckSize(deck:JSON[]) {
      var totalCards = 4*Object.keys(deck).length + 24;
      var text = document.getElementById("cardNumberText");
      text.textContent = "Number of Cards in Deck = " + totalCards + "/60";
  }

  uploadDeck() {
    let deckNameInput = document.getElementById("deckName") as HTMLInputElement;
    let deckName = deckNameInput.value;
    this._databaseService.uploadDeck(this.currentDeck, deckName);
    window.alert("Deck Saved Successfully!")
  }

  clearDeck() {
    this.clearedDeck.emit(null);
    this.noCards.emit(0);
    var totalCards = 24;
    var text = document.getElementById("cardNumberText");
    text.textContent = "Number of Cards in Deck = " + totalCards + "/60";
  }

  hideBuild(showBuild:boolean) {
    this.show = showBuild;
  }
}
