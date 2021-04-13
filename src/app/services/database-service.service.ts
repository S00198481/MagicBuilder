import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  deckDataCollection:AngularFirestoreCollection<JSON>;
  decksData:Observable<JSON[]>;
  allDeckData:JSON;
  erorrMessage:string;
  
  constructor(private _http:HttpClient, private _afs:AngularFirestore) {
    this.deckDataCollection = _afs.collection<JSON>("decks");
   }

  getDecks(): Observable<JSON[]> {
    this.decksData = this.deckDataCollection.valueChanges();
    this.decksData.subscribe(
      data => console.log("decks from database : "),
      data => console.log(data)
    )

    return this.decksData;
  }

  uploadDeck(deck: JSON, deckName:string) {

    this._afs.collection('decks').doc(deckName).set({
      deckName: "New Deck",
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
