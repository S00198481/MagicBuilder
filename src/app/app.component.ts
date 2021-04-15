import { Component, Output, EventEmitter } from '@angular/core';
import { MagicApiService } from './services/magic-api.service';
import { MagicResponse } from './magic-response';
import { DeckBuildComponent } from './deck-build/deck-build.component';
import { Deck } from './deck-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MagicApiService, DeckBuildComponent]
})
export class AppComponent {
  title = 'MagicBuilder';

  cards:any;
  savedCards:JSON;
  errorMessage:any;
  show:boolean;
  savedShow:boolean;
  colour:string = "any";
  cmc:number = 0;
  deck:Array<JSON> = [];
  buttonShow:boolean = true;
  boolSavedCards:boolean;
  boolSearchedCards:boolean;
  totalCards:number;


  constructor(private _magicService:MagicApiService, private _deckBuild:DeckBuildComponent) { }

  getCards(cardName:string):boolean {

    if (this.colour == "any" && this.cmc == 0) {
      this._magicService.getCards(cardName, "", 0).subscribe(
        cards => {
          this.cards = cards;
          console.log(cards);
          console.log(this.cards);
        },
        error => this.errorMessage = <any>error
      );
    }
    else if (this.colour != "any" && this.cmc == 0) {
      this._magicService.getCards(cardName, this.colour, 0).subscribe(
        cards => {
          this.cards = cards;
          console.log(cards);
          console.log(this.cards);
        },
        error => this.errorMessage = <any>error
      );
    }
    else if (this.colour == "any" && this.cmc != 0) {
      this._magicService.getCards(cardName, "", 0).subscribe(
        cards => {
          this.cards = cards;
          console.log(cards);
          console.log(this.cards);
        },
        error => this.errorMessage = <any>error
      );
    }
    else {
      this._magicService.getCards(cardName, this.colour, this.cmc).subscribe(
        cards => {
          this.cards = cards;
          console.log(cards);
          console.log(this.cards);
        },
        error => this.errorMessage = <any>error
      );
    }

    return false;
  }

  saveCard(card:JSON) {
    this.deck.push(card);  
  }

  getColour(chosenColour:string) {
    this.colour=chosenColour;
  }

  getCmc(chosenCmc:number) {
    this.cmc=chosenCmc;
  }
  
  getShow(currentShow:boolean) {
    this.show = currentShow;
  }

  hideSaved() {
    this.savedShow=false;
  }

  hideBuild() {
    this.show=false;
  }

  getSelectedDeck(selectedDeck:Deck) {
    console.log("In getSelectedDeck");
    console.log(selectedDeck.deck);
    this.savedCards = selectedDeck.deck;
    console.log(this.savedCards);
  }

  hideSearchedCards() {
    this.boolSearchedCards = false;
  }

  hideSavedCards() {
    this.boolSavedCards = false;
  }

  showSearchedCards() {
    this.boolSearchedCards = true;
  }

  showSavedCards() {
    this.boolSavedCards = true;
  }

  checkDeckSize() {
    //this.totalCards = Object.keys(this.deck).length + 24;  
    //console.log(this.totalCards);
    console.log(this.deck);
    this._deckBuild.checkDeckSize(this.deck);
  }

  hideButtons() {
    console.log("in hide buttons")
    var totalCards = Object.keys(this.deck).length;
    console.log(totalCards);
    if(totalCards == 9) {
      this.buttonShow=false;
      console.log("hide them!!")
    }
    else {
      this.buttonShow=true;
    }
  }
  
}
