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
  carsData:Observable<JSON[]>;
  allDeckData:JSON[];
  erorrMessage:string;
  
  constructor(private _http:HttpClient, private _afs:AngularFirestore) {
    this.deckDataCollection = _afs.collection<JSON>("decks");
   }
}
