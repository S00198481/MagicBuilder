import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckBuildComponent } from './deck-build.component';

describe('DeckBuildComponent', () => {
  let component: DeckBuildComponent;
  let fixture: ComponentFixture<DeckBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
