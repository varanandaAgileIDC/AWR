import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentScanPage } from './document-scan.page';

describe('DocumentScanPage', () => {
  let component: DocumentScanPage;
  let fixture: ComponentFixture<DocumentScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
