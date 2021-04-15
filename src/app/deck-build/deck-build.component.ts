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
    console.log(target.value);
    this.chosenColour.emit(target.value);
    console.log(this.currentDeck);
  }

  applyCmc(event) {
    var target = event.target;
    console.log(target.value);
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

  hideBuild(showBuild:boolean) {
    this.show = showBuild;
    console.log(this.show);
    console.log(showBuild);
  }
}
