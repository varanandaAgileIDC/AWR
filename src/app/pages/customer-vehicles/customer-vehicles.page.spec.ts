import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerVehiclesPage } from './customer-vehicles.page';

describe('CustomerVehiclesPage', () => {
  let component: CustomerVehiclesPage;
  let fixture: ComponentFixture<CustomerVehiclesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerVehiclesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerVehiclesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
