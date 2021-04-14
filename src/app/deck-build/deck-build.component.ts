import { Component, OnInit, Output, Input, EventEmitter, SimpleChange } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'
import { DatabaseServiceService } from '../services/database-service.service'

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

  constructor(private _magicService:MagicApiService, private _databaseService:DatabaseServiceService) {
    this.chosenColour = new EventEmitter();
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

  checkDeckSize() {
    let length = Object.keys(this.currentDeck).length;
    if(length== 9)
    {
      this.deckFull=true;
      this.buttonShow.emit(false);
    }
  }

  uploadDeck() {
    let deckNameInput = document.getElementById("deckName") as HTMLInputElement;
    let deckName = deckNameInput.value;
    this._databaseService.uploadDeck(this.currentDeck, deckName);
  }

  hideBuild(showBuild:boolean) {
    this.show = showBuild;
    console.log(this.show);
    console.log(showBuild);
  }
}
