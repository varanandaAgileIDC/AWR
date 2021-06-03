import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreakDownPage } from './break-down.page';

describe('BreakDownPage', () => {
  let component: BreakDownPage;
  let fixture: ComponentFixture<BreakDownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakDownPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BreakDownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
