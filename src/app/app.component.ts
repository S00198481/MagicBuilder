import { Component, Output, EventEmitter } from '@angular/core';
import { MagicApiService } from './services/magic-api.service';
import { MagicResponse } from './magic-response';
import { DeckBuildComponent } from './deck-build/deck-build.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MagicApiService]
})
export class AppComponent {
  title = 'MagicBuilder';

  cards:any;
  errorMessage:any;
  show:boolean;
  colour:string = "any";
  cmc:number = 0;
  deck:Array<JSON> = [];
  buttonShow:boolean = true;

  constructor(private _magicService:MagicApiService) { }

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
}
