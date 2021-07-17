import { Component, OnInit } from '@angular/core';
import { PostDataService, Elemento } from '../services/post-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttppostService } from '../services/httppost.service';


@Component({
  selector: 'app-pesquisas',
  templateUrl: './pesquisas.component.html',
  styleUrls: ['./pesquisas.component.scss']
})
export class PesquisasComponent {
  logado = true;
  constructor(private postDataService: PostDataService, public afAuth: AngularFireAuth, private service: HttppostService) {
    this.postDataService.setCollection('pesquisas');
    this.pesquisas$ = this.postDataService.getElements();
  }

  pesquisas$;
  pesquisaForm = new FormGroup(
    {
      title: new FormControl(),
      url: new FormControl(),
    });

  elemento: Elemento = {
    name: '',
    url: ''
  };

  onSubmit() {
    if (this.pesquisaForm.get('title').value != null && this.pesquisaForm.get('url').value != null) {
      this.elemento.name = this.pesquisaForm.value.title;
      this.elemento.url = this.pesquisaForm.value.url;
      this.postDataService.addElemento(this.elemento);

      this.pesquisaForm = new FormGroup({
        title: new FormControl(),
        url: new FormControl(),
      });

      const notification = {
        title: 'Cante Conosco!',
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
