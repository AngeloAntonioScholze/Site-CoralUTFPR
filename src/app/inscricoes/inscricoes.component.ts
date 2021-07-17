import { Component, OnInit } from '@angular/core';
import { PostDataService, Elemento } from '../services/post-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttppostService } from '../services/httppost.service';

@Component({
  selector: 'app-inscricoes',
  templateUrl: './inscricoes.component.html',
  styleUrls: ['./inscricoes.component.scss']
})
export class InscricoesComponent {
  logado = true;
  constructor(private postDataService: PostDataService, public afAuth: AngularFireAuth, private service: HttppostService) {
    this.postDataService.setCollection('inscricoes');
    this.inscricoes$ = this.postDataService.getElements();
  }

  inscricoes$;
  inscricoesForm = new FormGroup(
    {
      title: new FormControl(),
      url: new FormControl(),
    });

  elemento: Elemento = {
    name: '',
    url: ''
  };

  onSubmit() {
    if (this.inscricoesForm.get('title').value != null && this.inscricoesForm.get('url').value != null) {
      this.elemento.name = this.inscricoesForm.value.title;
      this.elemento.url = this.inscricoesForm.value.url;
      this.postDataService.addElemento(this.elemento);

      this.inscricoesForm = new FormGroup({
        title: new FormControl(),
        url: new FormControl(),
      });

      const notification = {
        title: 'Ingressos!',
        body: this.elemento.name,
      };
      this.service.enviaPush(notification);

    } else {
      alert('Algum campo está vazio. ');
    }
  }

  exclui_elemento(elementoId) {
    this.postDataService.deleteElemento(elementoId);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.logado = false;
  }

}
