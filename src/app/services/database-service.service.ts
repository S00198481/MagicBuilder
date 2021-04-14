import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService implements OnInit{

  deckDataCollection:AngularFirestoreCollection<JSON>;
  decksData:Observable<JSON[]>;
  allDeckData:JSON;
  erorrMessage:string;
  
  ngOnInit() {
    
  }

  constructor(private _http:HttpClient, private _afs:AngularFirestore) {
    this.deckDataCollection = _afs.collection<JSON>("decks");
   }

  getDecks(): Observable<JSON[]> {
    this.decksData = this.deckDataCollection.valueChanges();
    this.decksData.subscribe(
    )

    return this.decksData;
  }

  uploadDeck(deck: JSON, deckName:string) {

    this._afs.collection('decks').doc(deckName).set({
      deckName: deckName,
      deck: deck
    })
      .catch(e => {
        console.log(e);
      })
  }

   private handleError(err:HttpErrorResponse) {
     console.log("database error: " + err.message)
     return Observable.throw(err.message);
   }
}
