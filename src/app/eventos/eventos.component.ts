import { HttppostService } from './../services/httppost.service';
import { Component, OnInit } from '@angular/core';
import { PostDataService, Musica, Integrante } from '../services/post-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  logado = true;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: AngularFireStorage, private postDataService: PostDataService, public afAuth: AngularFireAuth, private service: HttppostService) {
    this.postDataService.setCollection('eventos');
    this.eventos$ = this.postDataService.getElements();
  }

  public optionsDate: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'dd/MM/yyyy',
  };

  public optionsTime: Pickadate.TimeOptions = {
    format: 'h:i',
    formatSubmit: 'hh:mm',
  };

  musicasForm = new FormGroup({
    nome: new FormControl(),
    autor: new FormControl(),
    partitura_url: new FormControl(),
  });

  eventosForm = new FormGroup({
    event_description: new FormControl(),
    nome: new FormControl(),
    data: new FormControl(),
    horario: new FormControl(),
    local: new FormControl(),
    ingressos: new FormControl()
  });

  integrantesForm = new FormGroup({
    nome: new FormControl()
  });

  eventos$;
  musicas = [];
  integrantes = [];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  files = {
    evento_imagem: '',
    equipe_imagem: ''
  };
  evento = {
    nome: '',
    data: '',
    horario: '',
    local: '',
    ingressos: '',
    description: '',
    imagem: '',
    equipe: {
      imagem: ''
    },
    musicas : [],
    integrantes : []
  };

  adiciona_musica() {

    if (this.musicasForm.get('nome').value != null && this.musicasForm.get('autor').value !=  null
    && this.musicasForm.get('partitura_url').value != null) {
      const musicaAdicionada = {
        nome:           this.musicasForm.value.nome,
        autor:          this.musicasForm.value.autor,
        partitura_url:  this.musicasForm.value.partitura_url,
      };

      this.musicasForm.reset();

      this.musicas.push(musicaAdicionada);

      this.musicasForm = new FormGroup({
        nome: new FormControl(),
        autor: new FormControl(),
        partitura_url: new FormControl(),
      });
    } else {
      alert('Algum campo de Músicas está vazio. ');
    }
  }

  adiciona_integrante() {
    if (this.integrantesForm.get('nome').value != null) {
      const integranteAdicionado = {
        nome: this.integrantesForm.value.nome
      };

      this.integrantesForm.reset();

      this.integrantes.push(integranteAdicionado);

      this.integrantesForm = new FormGroup({
        nome: new FormControl()
      });
    } else {
      alert('O nome do integrante não foi inscrito. ');
    }
  }

  remove_musica(musicaNome) {
    for (let i = 0; i < this.musicas.length; i++) {
      if (this.musicas[i].nome === musicaNome) {
        this.musicas.splice(i, 1);
      }
    }
  }

  remove_integrante(integranteNome) {
    for (let i = 0; i < this.integrantes.length; i++) {
      if (this.integrantes[i].nome === integranteNome) {
        this.integrantes.splice(i, 1);
      }
    }
  }

  cria_evento() {

    if (this.evento.nome != null && this.eventosForm.get('data').value != null
    && this.eventosForm.get('horario').value != null && this.evento.local != null
    && this.eventosForm.get('event_description').value != null) {
      this.evento.nome = this.eventosForm.value.nome;
      this.evento.data = this.eventosForm.value.data;
      this.evento.horario = this.eventosForm.value.horario;
      this.evento.local = this.eventosForm.value.local;
      this.evento.ingressos = this.eventosForm.value.ingressos;
      this.evento.description = this.eventosForm.value.event_description;
      this.evento.musicas = this.musicas;
      this.evento.integrantes = this.integrantes;

      this.postDataService.addElemento(this.evento);

      const notification = {
        title: 'Agenda!',
        body: this.eventosForm.value.nome,
      };
      this.service.enviaPush(notification);

      this.evento = {
        nome: '',
        data: '',
        horario: '',
        local: '',
        ingressos: '',
        description: '',
        imagem: '',
        equipe: {
          imagem: ''
        },
        musicas : [],
        integrantes : []
      };

      this.eventosForm = new FormGroup({
        event_description: new FormControl(),
        nome: new FormControl(),
        data: new FormControl(),
        horario: new FormControl(),
        local: new FormControl(),
        ingressos: new FormControl(),
      });

      this.musicas.splice(null);
      this.integrantes.splice(null);

    } else {
      alert('Algum campo de Eventos está vazio. ');
    }
  }

  pega_imagem_no_template(templateVar) {

    console.log(templateVar.files[0].name);

    switch (templateVar.name) {
      case 'imagem_evento':
        this.files.evento_imagem = templateVar.files[0];
        const ref =  this.storage.ref('/evento/' + templateVar.files[0].name);
        ref.put(this.files.evento_imagem).then( () => {
           ref.getDownloadURL().subscribe( url => {
             this.evento.imagem = url;
           });
        });
        break;
    }
  }

  pega_equipe_imagem_no_template(templateVar) {

    console.log(templateVar.files[0].name);

    switch (templateVar.name) {
      case 'imagem_equipe':
        this.files.equipe_imagem = templateVar.files[0];
        const ref =  this.storage.ref('/equipe/' + templateVar.files[0].name);
        ref.put(this.files.equipe_imagem).then( () => {
            ref.getDownloadURL().subscribe( url => {
              this.evento.equipe.imagem = url;
            });
        });
        break;
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
