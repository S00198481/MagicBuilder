import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MagicApiService } from './services/magic-api.service';
import { DeckBuildComponent } from './deck-build/deck-build.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SavedDecksComponent } from './saved-decks/saved-decks.component';


@NgModule({
  declarations: [
    AppComponent,
    DeckBuildComponent,
    SavedDecksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
