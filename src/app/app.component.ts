import { Component } from '@angular/core';
import { MagicApiService } from './services/magic-api.service';
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


  constructor(private _magicService:MagicApiService, private _deckBuild:DeckBuildComponent) {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, black, darkslategray)";
    document.body.style.height= "100vh";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
   }

  getCards(cardName:string):boolean {

    if (this.colour == "any" && this.cmc == 0) {
      this._magicService.getCards(cardName, "", 0).subscribe(
        cards => {
          this.cards = cards;
        },
        error => this.errorMessage = <any>error
      );
    }
    else if (this.colour != "any" && this.cmc == 0) {
      this._magicService.getCards(cardName, this.colour, 0).subscribe(
        cards => {
          this.cards = cards;
        },
        error => this.errorMessage = <any>error
      );
    }
    else if (this.colour == "any" && this.cmc != 0) {
      this._magicService.getCards(cardName, "", this.cmc).subscribe(
        cards => {
          this.cards = cards;
        },
        error => this.errorMessage = <any>error
      );
    }
    else {
      this._magicService.getCards(cardName, this.colour, this.cmc).subscribe(
        cards => {
          this.cards = cards;
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
    console.log("in cmc 2")
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
    if (selectedDeck == null)
    {
      this.savedCards = null;
    }
    else
    {    
    this.savedCards = selectedDeck.deck;
    }
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
    this._deckBuild.checkDeckSize(this.deck);
  }

  hideButtons() {
    var totalCards = Object.keys(this.deck).length;
    if(totalCards == 9) {
      this.buttonShow=false;
    }
    else {
      this.buttonShow=true;
    }
  }

  clearDeck() {
    this.deck = [];
  }
  
}
