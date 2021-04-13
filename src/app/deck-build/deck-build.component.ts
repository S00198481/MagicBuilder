import { Component, OnInit, Output, Input, EventEmitter, SimpleChange } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'

@Component({
  selector: 'app-deck-build',
  templateUrl: './deck-build.component.html',
  styleUrls: ['./deck-build.component.css']
})
export class DeckBuildComponent implements OnInit {

  @Output() chosenColour = new EventEmitter<string>();
  @Output() chosenCmc = new EventEmitter<number>();
  @Output() currentShow = new EventEmitter<boolean>();

  @Input() currentDeck:Array<JSON>; 

  constructor(private _magicService:MagicApiService) {
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
    if(this.currentDeck.length == 9)
    {
      this.deckFull=true;
    }
  }
}
