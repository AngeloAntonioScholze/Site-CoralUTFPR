import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisasComponent } from './pesquisas.component';

describe('PesquisasComponent', () => {
  let component: PesquisasComponent;
  let fixture: ComponentFixture<PesquisasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
