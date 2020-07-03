import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DotacionPage } from './dotacion.page';

describe('DotacionPage', () => {
  let component: DotacionPage;
  let fixture: ComponentFixture<DotacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DotacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
