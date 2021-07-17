import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logado = false;
  title = 'Coral UTFPR';

  loginForm = new FormGroup(
  {
    loginEmail: new FormControl(),
    loginPassword: new FormControl(),
  });

  constructor(public afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword).then(retorno => {
    this.logado = true;
    }).catch(() => {
      alert('Email ou senha incorretos. ');
    });

    this.loginForm = new FormGroup({
      loginEmail: new FormControl(null),
      loginPassword: new FormControl(null)
    });
  }
}
