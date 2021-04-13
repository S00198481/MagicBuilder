import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { build$ } from 'protractor/built/element';
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

  constructor(private _magicService:MagicApiService) {
    this.chosenColour = new EventEmitter();
   }
  

  ngOnInit(): void {
    
  }
  deck:Array<JSON>;
  show:boolean;
  colour:string;
  cmc:number;

  applyColour(event) {
    var target = event.target;
    console.log(target.value);
    this.chosenColour.emit(target.value);
  }

  applyCmc(event) {
    var target = event.target;
    console.log(target.value);
    this.chosenCmc.emit(target.value);
  }

  changeShow(event) {
    this.currentShow.emit(this.show);
  }
}
