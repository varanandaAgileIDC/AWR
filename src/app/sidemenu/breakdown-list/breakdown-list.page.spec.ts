import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreakdownListPage } from './breakdown-list.page';

describe('BreakdownListPage', () => {
  let component: BreakdownListPage;
  let fixture: ComponentFixture<BreakdownListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakdownListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BreakdownListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
