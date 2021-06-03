import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpeedCheckPage } from './speed-check.page';

describe('SpeedCheckPage', () => {
  let component: SpeedCheckPage;
  let fixture: ComponentFixture<SpeedCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeedCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
