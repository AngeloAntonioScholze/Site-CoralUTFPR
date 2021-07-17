import { Component, OnInit } from '@angular/core';
import { PostDataService, Elemento } from '../services/post-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttppostService } from '../services/httppost.service';

@Component({
  selector: 'app-exercicios-musicais',
  templateUrl: './exercicios-musicais.component.html',
  styleUrls: ['./exercicios-musicais.component.scss']
})
export class ExerciciosMusicaisComponent {
  logado = true;
  constructor(private postDataService: PostDataService, public afAuth: AngularFireAuth, private service: HttppostService) {
    this.postDataService.setCollection('exercicios-musicais');
    this.exerciciosMusicais$ = this.postDataService.getElements();
  }

  exerciciosMusicais$;
  exerciciosMusicaisForm = new FormGroup(
    {
      exercicios_musicais_title: new FormControl(),
      exercicios_musicais_url: new FormControl(),
      exercicios_musicais_description: new FormControl(),
    });
  elemento: Elemento = {
    name: '',
    url: '',
    detalhes: '',
  };

  onSubmit() {
    if (this.exerciciosMusicaisForm.get('exercicios_musicais_title').value != null
    && this.exerciciosMusicaisForm.get('exercicios_musicais_url').value != null 
    && this.exerciciosMusicaisForm.get('exercicios_musicais_description').value != null) {
      this.elemento.name = this.exerciciosMusicaisForm.value.exercicios_musicais_title,
      this.elemento.url = this.exerciciosMusicaisForm.value.exercicios_musicais_url,
      this.elemento.detalhes = this.exerciciosMusicaisForm.value.exercicios_musicais_description,
      this.postDataService.addElemento(this.elemento);

      this.exerciciosMusicaisForm = new FormGroup({
        exercicios_musicais_title: new FormControl(),
        exercicios_musicais_url: new FormControl(),
        exercicios_musicais_description: new FormControl(),
      });

      const notification = {
        title: 'Aprenda Música!',
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
