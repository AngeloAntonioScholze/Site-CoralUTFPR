import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  logado = true;
  title = 'Coral UTFPR';

  constructor(public afAuth: AngularFireAuth) {}

  logout() {
    this.afAuth.auth.signOut();
    this.logado = false;
  }
}
