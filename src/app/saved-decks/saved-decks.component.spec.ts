import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDecksComponent } from './saved-decks.component';

describe('SavedDecksComponent', () => {
  let component: SavedDecksComponent;
  let fixture: ComponentFixture<SavedDecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedDecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
