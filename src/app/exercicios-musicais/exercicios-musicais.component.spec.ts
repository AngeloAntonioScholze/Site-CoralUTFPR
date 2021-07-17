import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciciosMusicaisComponent } from './exercicios-musicais.component';

describe('ExerciciosMusicaisComponent', () => {
  let component: ExerciciosMusicaisComponent;
  let fixture: ComponentFixture<ExerciciosMusicaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciciosMusicaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciciosMusicaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
