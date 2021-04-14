import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-saved-decks',
  templateUrl: './saved-decks.component.html',
  styleUrls: ['./saved-decks.component.css']
})
export class SavedDecksComponent implements OnInit {

  @Output() buildShow = new EventEmitter<boolean>();

  constructor() { }
  savedShow:boolean;
  savedDecks:Array<JSON>;

  ngOnInit(): void {
  }

  

  uploadDeck() {

  }
}
