import { HttppostService } from './../services/httppost.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostDataService, Elemento } from '../services/post-data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  logado = true;
  
  editorForm: FormGroup;

  newsletters$;
  editor = {
    nome: '',
    detalhes: '',
    url: '',
    imagem: ''
  };

  files = {
    editor_imagem: ''
  };

  // tslint:disable-next-line:max-line-length
  constructor(private storage: AngularFireStorage, private postDataService: PostDataService, public afAuth: AngularFireAuth, private service: HttppostService) {
    this.postDataService.setCollection('newsletters');
    this.newsletters$  = this.postDataService.getElements();

    this.editorForm = new FormGroup({
      nome: new FormControl(),
      editor: new FormControl(),
      url: new FormControl()
    });
  }

  onSubmit() {
    // tslint:disable-next-line:max-line-length
    if (this.editorForm.get('nome').value != null && this.editorForm.get('url').value != null && this.editorForm.get('editor').value != null) {
      this.editor.nome = this.editorForm.value.nome;
      this.editor.detalhes = this.editorForm.get('editor').value;
      this.editor.url = this.editorForm.get('url').value;
      this.postDataService.addElemento(this.editor);

      const notification = {
        title: 'Fique Ligado!',
        body: this.editorForm.value.nome,
      };
      this.service.enviaPush(notification);

      this.editor = {
        nome: '',
        detalhes: '',
        url: '',
        imagem: ''
      };

      this.editorForm = new FormGroup({
        nome: new FormControl(),
        editor: new FormControl(),
        url: new FormControl()
      });

    } else {
      alert('Algum campo está vazio. ');
    }
  }

  pega_imagem_no_template(templateVar) {

    console.log(templateVar.files[0].name);

    switch (templateVar.name) {
      case 'imagem_editor':
        this.files.editor_imagem = templateVar.files[0];
        const ref =  this.storage.ref('/editor/' + templateVar.files[0].name);
        ref.put(this.files.editor_imagem).then( () => {
           ref.getDownloadURL().subscribe( url => {
             this.editor.imagem = url;
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
