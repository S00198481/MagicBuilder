import { Component, OnInit } from '@angular/core';
import { MagicApiService } from '../services/magic-api.service'

@Component({
  selector: 'app-deck-build',
  templateUrl: './deck-build.component.html',
  styleUrls: ['./deck-build.component.css']
})
export class DeckBuildComponent implements OnInit {

  constructor(private _magicService:MagicApiService) { }

  ngOnInit(): void {
    deck:Array:JSON;
  }

}
